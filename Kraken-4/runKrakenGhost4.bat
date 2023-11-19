@echo off

set "temp=C:\Users\ginav\uniandes\krakenNode16\Kraken-4\features\temporal_features"
set "features=C:\Users\ginav\uniandes\krakenNode16\Kraken-4\features"

for /f "delims=" %%F in ('dir /on /b /a-d "%temp%\*.feature"') do (
    copy "%temp%\%%F" "%features%" 
    call npx kraken-node run
    del "%features%\%%~nxF"

    echo Escenario "%%~nxF" Ejecutado

    for /d %%D in ("%temp%\lighthouse*") do (
        rd /s /q "%%D"
    )
)

echo Se han ejecutado todos los escenarios de prueba
pause