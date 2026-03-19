

## Problema

A logo está embaçada e parece "colada" porque:
1. O arquivo `actus-logo-clean.png` foi processado por um script Python que pode ter degradado a qualidade
2. A imagem pode ter fundo opaco (branco/cinza) que não se integra ao fundo escuro da sidebar
3. O container `h-12 w-12` pode estar escalando a imagem de forma inadequada

## Plano

**Arquivo: `src/components/AppSidebar.tsx`**

1. **Usar a imagem original do upload** — trocar o `import` do asset processado pelo arquivo original em `/lovable-uploads/cfa08f7c-8ae0-4e1e-8835-233d8fa03486.png` que está em alta qualidade
2. **Renderização nítida** — adicionar `style={{ imageRendering: 'auto' }}` e usar tamanho `h-10 w-10` (40px) que é mais natural para ícones
3. **Sem container extra** — a `<img>` direta, sem `div` wrapper que adiciona complexidade desnecessária
4. **Sem bordas, sombras ou rings** — apenas a imagem pura integrada ao fundo da sidebar

Resultado: logo nítida, sem aparência de "print colado", integrada naturalmente ao layout escuro.

