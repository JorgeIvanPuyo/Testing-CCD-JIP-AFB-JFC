@echo off

set "temp=C:\Users\ginav\uniandes\krakenNode16\Kraken\features\temporal_features"
set "features=C:\Users\ginav\uniandes\krakenNode16\Kraken\features"

for /f "delims=" %%F in ('dir /on /b /a-d "%temp%\*.feature"') do (
    copy "%temp%\%%F" "%features%" 
    call npx kraken-node run
    del "%features%\%%~nxF"

    echo Escenario "%%~nxF" Ejecutado
)

echo Se han ejecutado todos los escenarios de prueba
pause