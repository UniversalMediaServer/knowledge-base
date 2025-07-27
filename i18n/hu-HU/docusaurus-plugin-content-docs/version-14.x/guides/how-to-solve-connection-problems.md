# Hogyan lehet megoldani a csatlakozási problémákat

Ez az oldal megoldásokat kínál a leggyakoribb csatlakozási problémákra, amelyekkel felhasználóink találkoznak.

## Az UMS érzékeli a megjelenítőt, de a megjelenítő nem érzékeli az UMS-t

Ez általában akkor fordul elő, ha a számítógépen egynél több aktív hálózati kapcsolat van (például egy vezetékes és egy vezeték nélküli). Ezt úgy oldhatja meg, hogy beállítja, hogy melyik hálózati interfészt szeretné:

1. Nyissa meg az UMS-t
2. Válassza az `Általános beállítások` lapot.
3. Bontsa ki a `Hálózati kapcsolat kényszerítése az interfészen:` legördülő listát, és válassza ki a kívánt adaptert. A legördülő listában sok lehetőség lehet. A kívántnak általában a név után zárójelben szerepel például az IP-cím:  
   ![A GUI megnyitása](@site/docs/guides/img/how-to-solve-connection-problems.png)