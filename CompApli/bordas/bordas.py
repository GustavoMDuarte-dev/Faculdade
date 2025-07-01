import cv2
import numpy as np
import matplotlib.pyplot as plt

def pre_processar_para_bordas_gerais(img_cinza, params):
    """Pré-processa a imagem para detecção de bordas gerais (Canny/Sobel)."""
    img_processada = img_cinza.copy()

    if params.get('usar_clahe', False):
        clahe = cv2.createCLAHE(
            clipLimit=params['clahe_clip_limit'],
            tileGridSize=params['clahe_tile_grid_size']
        )
        img_processada = clahe.apply(img_processada)

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

def aplicar_sobel_binarizado(img, params):
    """Aplica o filtro de Sobel e binariza o resultado."""
    sobel_x = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=params['sobel_ksize'])
    sobel_y = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=params['sobel_ksize'])
    magnitude = cv2.convertScaleAbs(cv2.magnitude(sobel_x, sobel_y))
    _, binarizada = cv2.threshold(magnitude, params['sobel_limiar_valor'], 255, cv2.THRESH_BINARY)
    return binarizada

def aplicar_canny(img, params):
    """Aplica o filtro de Canny."""
    return cv2.Canny(img, params['canny_t1'], params['canny_t2'])

def analisar_fratura(img_cinza, params):
    """
    Função otimizada para realçar e detectar fraturas.
    Aplica a cadeia: CLAHE -> Black-Hat -> Canny.
    """
    # PASSO 1 (NOVO): Realçar o contraste local com CLAHE.
    clahe = cv2.createCLAHE(
        clipLimit=params['clahe_clip_limit'],
        tileGridSize=params['clahe_tile_grid_size']
    )
    img_contrastada = clahe.apply(img_cinza)

    # PASSO 2: Isolar a fratura usando Black-Hat na imagem JÁ CONTRASTADA.
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, params['blackhat_kernel_size'])
    img_blackhat = cv2.morphologyEx(img_contrastada, cv2.MORPH_BLACKHAT, kernel)

    # PASSO 3: Detetar o contorno da fratura isolada.
    contorno_fratura = cv2.Canny(img_blackhat, 
                                 params['canny_t1_fratura'], 
                                 params['canny_t2_fratura'])

    # Exibição dos resultados da análise da fratura
    plt.figure(figsize=(12, 8))
    plt.subplot(1, 3, 1)
    plt.imshow(img_contrastada, cmap='gray')
    plt.title('1. Imagem com Contraste Realçado')
    plt.axis('off')

    plt.subplot(1, 3, 2)
    plt.imshow(img_blackhat, cmap='gray')
    plt.title('2. Fratura Isolada com Black-Hat')
    plt.axis('off')

    plt.subplot(1, 3, 3)
    plt.imshow(contorno_fratura, cmap='gray')
    plt.title('3. Contorno Final da Fratura')
    plt.axis('off')

    plt.tight_layout()
    plt.show()

def main():
    # --- PAINEL DE CONTROLO PRINCIPAL ---
    caminho_da_imagem = 'CompApli/bordas/metacarpal-fracture-7.png' # COLOQUE O NOME DA SUA IMAGEM DA MÃO AQUI

    # --- Configurações para a análise da fratura ---
    parametros_fratura = {
        # Parâmetros do CLAHE para realçar a fratura
        'clahe_clip_limit': 4.0, # Um clip limit mais alto para maior contraste
        'clahe_tile_grid_size': (8, 8),

        # Kernel do Black-Hat para encontrar a linha da fratura
        'blackhat_kernel_size': (13, 5),

        # Limiares do Canny para o contorno final
        'canny_t1_fratura': 20,
        'canny_t2_fratura': 60
    }

    img_original = cv2.imread(caminho_da_imagem)
    if img_original is None:
        print(f"Erro ao carregar a imagem: {caminho_da_imagem}")
        return

    # Opcional: Recortar a imagem para focar na área de interesse
    # Exemplo (ajuste as coordenadas [y1:y2, x1:x2]):
    # img_original = img_original[100:400, 200:500] 

    img_cinza = cv2.cvtColor(img_original, cv2.COLOR_BGR2GRAY)
    
    analisar_fratura(img_cinza, parametros_fratura)


if __name__ == '__main__':
    main()
