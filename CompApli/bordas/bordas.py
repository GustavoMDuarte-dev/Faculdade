import cv2
import numpy as np
import matplotlib.pyplot as plt

def pre_processar_imagem(img_cinza, params):
    img_processada = img_cinza.copy()

    if params.get('usar_clahe', False):
        # --- Lógica de Mascaramento para proteger o fundo preto ---
        # 1. Criar uma máscara que identifica as áreas de interesse (não o fundo preto).
        _, mask = cv2.threshold(img_cinza, 5, 255, cv2.THRESH_BINARY)

        # 2. Aplicar o CLAHE na imagem inteira para realçar o contraste.
        clahe = cv2.createCLAHE(
            clipLimit=params['clahe_clip_limit'],
            tileGridSize=params['clahe_tile_grid_size']
        )
        img_clahe = clahe.apply(img_processada)

        # 3. Aplicar a máscara para manter o fundo preto e usar o realce apenas na área de interesse.
        img_processada = cv2.bitwise_and(img_clahe, img_clahe, mask=mask)


    if params.get('usar_filtro_gaussiano', False):
        img_processada = cv2.GaussianBlur(
            img_processada,
            params['gaussiano_ksize_geral'],
            0
        )
    
    if params.get('usar_filtro_mediana', False):
        img_processada = cv2.medianBlur(
            img_processada,
            params['mediana_ksize']
        )
        
    return img_processada

def aplicar_sobel(img, params):
    sobel_x = cv2.Sobel(
        img, cv2.CV_64F, 1, 0, ksize=params['sobel_ksize']
    )
    sobel_y = cv2.Sobel(
        img, cv2.CV_64F, 0, 1, ksize=params['sobel_ksize']
    )
    magnitude = cv2.convertScaleAbs(cv2.magnitude(sobel_x, sobel_y))
    _, binarizada = cv2.threshold(
        magnitude, params['sobel_limiar_valor'], 255, cv2.THRESH_BINARY
    )
    return binarizada

def aplicar_canny(img, params):
    return cv2.Canny(
        img, params['canny_t1'], params['canny_t2']
    )

def exibir_resultados(original, pre_proc, sobel, canny, params):
    plt.figure(figsize=(15, 10))

    plt.subplot(2, 2, 1)
    plt.imshow(cv2.cvtColor(original, cv2.COLOR_BGR2RGB))
    plt.title('Imagem Original')
    plt.axis('off')

    plt.subplot(2, 2, 2)
    plt.imshow(pre_proc, cmap='gray')
    plt.title('Imagem Pré-Processada (com Máscara)')
    plt.axis('off')

    plt.subplot(2, 2, 3)
    plt.imshow(sobel, cmap='gray')
    plt.title(f"Sobel Binarizado (L={params['sobel_limiar_valor']})")
    plt.axis('off')

    plt.subplot(2, 2, 4)
    plt.imshow(canny, cmap='gray')
    plt.title(f"Filtro de Canny (T1={params['canny_t1']}, T2={params['canny_t2']})")
    plt.axis('off')

    plt.tight_layout()
    plt.show()

def main():
    # ==============================================================================
    # --- PAINEL DE CONTROLO PRINCIPAL ---
    # Altere os parâmetros aqui para experimentar com diferentes imagens e filtros
    # ==============================================================================
    caminho_da_imagem = 'CompApli/bordas/fifth-proximal-phalanx-fracture-of-the-foot-1.png'

    parametros = {
        # Ativar CLAHE para realçar o contraste da fratura sem estragar o fundo.
        'usar_clahe': True,
        'clahe_clip_limit': 3.0,
        'clahe_tile_grid_size': (8, 8),

        # Usar uma leve suavização para limpar ruído realçado pelo CLAHE.
        'usar_filtro_gaussiano': True,
        'gaussiano_ksize_geral': (5, 5),

        'usar_filtro_mediana': False, 
        'mediana_ksize': 3,
        
        'sobel_ksize': 3,
        'sobel_limiar_valor': 40, # Ajuste conforme necessário.

        'canny_t1':50,
        'canny_t2': 100 
    }

    img_original = cv2.imread(caminho_da_imagem)
    if img_original is None:
        print(f"Erro ao carregar a imagem: {caminho_da_imagem}")
        return

    img_cinza = cv2.cvtColor(img_original, cv2.COLOR_BGR2GRAY)

    img_pre_processada = pre_processar_imagem(img_cinza, parametros)
    
    resultado_sobel = aplicar_sobel(img_pre_processada, parametros)
    
    resultado_canny = aplicar_canny(img_pre_processada, parametros)

    exibir_resultados(
        img_original,
        img_pre_processada,
        resultado_sobel,
        resultado_canny,
        parametros
    )

if __name__ == '__main__':
    main()
