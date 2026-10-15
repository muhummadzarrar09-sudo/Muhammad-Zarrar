ZARRAR.SOLUTIONS — MUHAMMAD ZARRAR
BUSINESS CARD / PRINT HANDOFF

ARTWORK
  Page 1: cream contact side.
  Page 2: dark-ink brand side, website QR.
  Finished size: 88.9 x 50.8 mm (3.5 x 2 inches), landscape.
  Bleed: 3 mm on every edge.
  Important content: at least 5 mm inside the trim.
  Both sides are supplied upright, head-to-head. Do not mirror the back.
  Confirm the duplex orientation with your printer's proof/imposition.

WHICH FILE TO USE
  zarrar-business-card-clean.pdf
    The card-only presentation PDF, with two pages:
      1. Cream front centered on a dark-ink background (#1A1412).
      2. Dark-ink reverse centered on a cream background (#F3E4C7).
    No added headings, captions, swatches, shadows, or crop marks.
    The original cards remain 88.9 x 50.8 mm, with a 12.7 mm surround.
    Page size: 114.3 x 76.2 mm. Fonts and QR remain vector; links are live.
    For viewing and sharing, not a substitute for the print master below.

  zarrar-business-card-print.pdf
    The production-layout master. Two pages with embedded, subset fonts,
    vector text/lines/QR, the original logo, crop marks, TrimBox and BleedBox.
    MediaBox: 100.9 x 62.8 mm, including the outer crop-mark space.
    TrimBox: 88.9 x 50.8 mm.
    BleedBox: 94.9 x 56.8 mm.
    Print at 100% / actual size. Do not use "fit to page".

  zarrar-business-card-digital.pdf
    Trimmed, two-page RGB PDF for screen sharing. The phone, website and QR
    area are clickable. No crop marks or extra bleed on this file.

  front.svg / back.svg
    Self-contained artwork with 3 mm bleed and no crop marks.
    Canvas: 94.9 x 56.8 mm. Trim begins 3 mm inside each edge.
    Typography and QR are outlined vectors; the original PNG logo is embedded.
    No font installation is needed. To edit text, use card.json and the
    Python generator in the repository, rather than editing the outlines.

  front.png / back.png
    1050 x 600 px trimmed exports, 300 dpi.
    These and the large preview are reference images, not the bleed master.

COLOUR AND PRODUCTION
  Artwork uses the current website's RGB palette:
    Cream       #F3E4C7
    Dark ink    #1A1412
    Terracotta  #A3492F
    Copper      #E7925E
    Walnut      #5A3328
    Sand        #D8B89A
  These values are screen references, not Pantone or spot-ink specifications.
  This is not a certified PDF/X file. If your workflow needs CMYK/PDF-X,
  convert using the correct press/paper ICC profile and embed the output
  intent. Do not assume a generic CMYK conversion will match the screen.
  Crop marks are K-only. The logo retains transparency in the PDF.
  Obtain a physical colour and trim proof before printing a full batch.
  Suggested finish: 350 gsm smooth matte stock; square corners.
  Dark solid areas may show scuffing; discuss matte lamination with the printer.
  The artwork does not require foil, embossing, or special spot inks.

QUALITY CHECKS
  All essential content is inside a 5 mm safe area.
  Original logo effective resolution: approximately 308 ppi at its largest.
  No AI redraw or enlargement was used for the logo.
  The 23 mm QR uses error correction Q and a four-module quiet zone.
  Its payload is exactly: https://zarrarsolutions.vercel.app
  It was decoded from all three exported PDFs at 150 dpi and 300 dpi.
  Scan the actual printed proof before approving the run.
  See preflight.json for machine-checked dimensions, fonts and QR results.

CONTENT
  Muhammad Zarrar — Chief Executive Officer
  Brand: Zarrar.Solutions
  Phone / WhatsApp: 0333 5666050 (international: +92 333 5666050)
  Website: https://zarrarsolutions.vercel.app
  Zarrar.Solutions is used as the brand name, not as an additional web address.
  No email or postal address has been added.

SOURCE
  scripts/generate_business_card.py
  design/business-card/card.json
  design/business-card/requirements.txt
  The generator reads the website CSS, original OG logo, and local fonts.
  No website routes, dependencies, contact data, or public assets were changed.
