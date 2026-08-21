"""
Prepara as fotos dos segmentos para a hero.

Uso:
    python scripts/preparar_fotos.py <pasta_com_as_fotos>

A pasta pode conter arquivos em qualquer resolução e formato (jpg, png, webp,
jpeg). O nome do arquivo só precisa conter a palavra do segmento — por exemplo
"cafeteria.jpg", "foto-hamburgueria-01.png", "minha pizzaria.webp".

Para cada segmento reconhecido o script gera dois arquivos em public/segmentos/:

    <id>-bg.jpg   fundo da hero, 1920x1080, levemente escurecido

A hero espera o prato do lado ESQUERDO (é assim que ele fica sob o texto sem
brigar com o carrossel). Fotos com o assunto à direita precisam ser espelhadas:

    --espelhar tudo                     espelha todas
    --espelhar cafeteria,pizzaria,bar   espelha só esses segmentos

Tentei detectar o lado automaticamente pelo brilho e pela saturação, mas as duas
heurísticas erram em cenas com luminárias fortes do lado oposto ao prato — então
a escolha é sua, explícita.

Os cards redondos do carrossel ficam em <id>.png e não são tocados aqui — para
regerá-los a partir de uma foto nova, chame gerar_card() manualmente.

Arquivos já existentes são sobrescritos. Segmentos sem foto correspondente são
apenas listados no final e continuam usando o que já está lá.
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

SEGMENTOS = [
    "cafeteria",
    "hamburgueria",
    "restaurante",
    "bar",
    "lanchonete",
    "pizzaria",
]

# apelidos aceitos no nome do arquivo, além do próprio id
APELIDOS = {
    "cafeteria": ["cafeteria", "cafe", "café", "coffee"],
    "hamburgueria": ["hamburgueria", "hamburguer", "burger", "hamburger"],
    "restaurante": ["restaurante", "restaurant", "prato"],
    "bar": ["bar", "drink", "coquetel", "cocktail"],
    "lanchonete": ["lanchonete", "lanche", "sanduiche", "sanduíche", "snack"],
    "pizzaria": ["pizzaria", "pizza"],
}

BG_SIZE = (1920, 1080)
CARD_SIZE = 320
EXTENSOES = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "public" / "segmentos"


def cobrir(img: Image.Image, size: tuple[int, int]) -> Image.Image:
    """Redimensiona cobrindo o quadro inteiro e corta o excesso (object-fit: cover)."""
    alvo = size[0] / size[1]
    atual = img.width / img.height
    if atual > alvo:
        nova_l = int(round(img.height * alvo))
        caixa = ((img.width - nova_l) // 2, 0, (img.width + nova_l) // 2, img.height)
    else:
        nova_a = int(round(img.width / alvo))
        caixa = (0, (img.height - nova_a) // 2, img.width, (img.height + nova_a) // 2)
    return img.crop(caixa).resize(size, Image.LANCZOS)


def gerar_fundo(img: Image.Image, destino: Path) -> None:
    bg = cobrir(img, BG_SIZE).convert("RGB")
    bg = ImageEnhance.Brightness(bg).enhance(0.82)
    bg = ImageEnhance.Color(bg).enhance(1.06)
    bg.save(destino, quality=88, optimize=True)


def gerar_card(img: Image.Image, destino: Path) -> None:
    card = cobrir(img, (CARD_SIZE, CARD_SIZE)).convert("RGBA")
    card = card.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=3))
    mask = Image.new("L", (CARD_SIZE * 4, CARD_SIZE * 4), 0)
    ImageDraw.Draw(mask).ellipse(
        (0, 0, CARD_SIZE * 4 - 1, CARD_SIZE * 4 - 1), fill=255
    )
    card.putalpha(mask.resize((CARD_SIZE, CARD_SIZE), Image.LANCZOS))
    card.save(destino)


def identificar(nome: str) -> str | None:
    baixo = nome.lower()
    # o mais específico primeiro, para "hamburgueria" não cair em "bar"
    for seg in sorted(SEGMENTOS, key=lambda s: -len(s)):
        for apelido in sorted(APELIDOS[seg], key=len, reverse=True):
            if apelido in baixo:
                return seg
    return None


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 1

    origem = Path(sys.argv[1]).expanduser()
    if not origem.is_dir():
        print(f"Pasta não encontrada: {origem}")
        return 1

    DESTINO.mkdir(parents=True, exist_ok=True)
    encontrados: dict[str, Path] = {}

    for arquivo in sorted(origem.iterdir()):
        if arquivo.suffix.lower() not in EXTENSOES:
            continue
        seg = identificar(arquivo.stem)
        if seg and seg not in encontrados:
            encontrados[seg] = arquivo

    if not encontrados:
        print("Nenhuma foto reconhecida. O nome do arquivo precisa conter o")
        print("segmento, por exemplo: cafeteria.jpg, burger.png, pizza.webp")
        return 1

    espelhar: set[str] = set()
    if "--espelhar" in sys.argv:
        i = sys.argv.index("--espelhar") + 1
        alvo = sys.argv[i] if i < len(sys.argv) else ""
        if alvo in ("tudo", "todas", "todos"):
            espelhar = set(SEGMENTOS)
        else:
            espelhar = {x.strip().lower() for x in alvo.split(",") if x.strip()}
            desconhecidos = espelhar - set(SEGMENTOS)
            if desconhecidos:
                print(f"Segmento inválido em --espelhar: {', '.join(sorted(desconhecidos))}")
                return 1

    for seg, arquivo in encontrados.items():
        with Image.open(arquivo) as img:
            img = img.convert("RGB")
            if min(img.size) < 900:
                print(f"  aviso: {arquivo.name} tem {img.width}x{img.height} — "
                      f"o fundo pode ficar amaciado")
            espelhada = seg in espelhar
            if espelhada:
                img = ImageOps.mirror(img)
            gerar_fundo(img, DESTINO / f"{seg}-bg.jpg")
        marca = "  (espelhada)" if espelhada else ""
        print(f"  {seg:<13} <- {arquivo.name}{marca}")

    faltando = [s for s in SEGMENTOS if s not in encontrados]
    print(f"\n{len(encontrados)} segmento(s) atualizado(s) em public/segmentos/")
    if faltando:
        print(f"Sem foto nova (mantidos como estão): {', '.join(faltando)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
