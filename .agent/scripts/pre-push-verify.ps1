# Script de Verificação Pré-Push MinhasFinanças
Write-Host "🚀 Iniciando verificação de build local..." -ForegroundColor Cyan

# 1. Roda o build do Next.js (que inclui lint e tsc)
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERRO: O build falhou localmente. Abortando push para evitar falha na Vercel." -ForegroundColor Red
    exit 1
}

Write-Host "✅ SUCESSO: Build passou. O código está seguro para deploy." -ForegroundColor Green
exit 0
