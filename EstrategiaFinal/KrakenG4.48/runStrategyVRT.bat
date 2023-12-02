@echo off

set "temp=C:\Users\ginav\uniandes\krakenNode16\EstrategiaFinal\KrakenG4.48\features\VRT"
set "features=C:\Users\ginav\uniandes\krakenNode16\EstrategiaFinal\KrakenG4.48\features"

for /f "delims=" %%F in ('dir /on /b /a-d "%temp%\*.feature"') do (
    copy "%temp%\%%F" "%features%" 
    call npx kraken-node run
    del "%features%\%%~nxF"

    echo Escenario "%%~nxF" Ejecutado

    for /d %%D in ("%temp%\lighthouse*") do (
        rd /s /q "%%D"
    )
)

echo Se han ejecutado todos los escenarios de prueba en Ghost 4.48, presione cualquier tecla para continuar con Ghost 5.72
pause

call cd C:\Users\ginav\uniandes\krakenNode16\EstrategiaFinal\KrakenG5.72
set "temp=C:\Users\ginav\uniandes\krakenNode16\EstrategiaFinal\KrakenG5.72\features\VRT"
set "features=C:\Users\ginav\uniandes\krakenNode16\EstrategiaFinal\KrakenG5.72\features"

for /f "delims=" %%F in ('dir /on /b /a-d "%temp%\*.feature"') do (
    copy "%temp%\%%F" "%features%" 
    call npx kraken-node run
    del "%features%\%%~nxF"

    echo Escenario "%%~nxF" Ejecutado

    for /d %%D in ("%temp%\lighthouse*") do (
        rd /s /q "%%D"
    )
)

echo Se han ejecutado todos los escenarios de prueba en Ghost 5.72, presione cualquier tecla para continuar con resembleJS
pause

call cd C:\Users\ginav\uniandes\krakenNode16\resembleKraken
rmdir /s /q results
call node index.js

echo Se ha generado el reporte de las pruebas de regresión visual, revise el archivo report.html de la carpeta resembleKraken\results
pause