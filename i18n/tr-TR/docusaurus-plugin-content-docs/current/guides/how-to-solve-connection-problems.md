# Bağlantı sorunları nasıl çözülür

Bu sayfa, kullanıcılarımızın karşılaştığı en yaygın bağlantı sorunlarına yönelik çözümler sunmaktadır.

## UMS detects renderer, but renderer does not detect UMS

This usually happens when your computer has more than one active network connection (for example, one wired and one wireless). You can solve it by setting which network interface you want:

1. Open UMS
2. Select the `General Settings` tab
3. Expand the `Force networking on interface:` dropdown and select the interface you want. There might be a lot of options in the dropdown. The one you want will usually have an IP address in brackets after the name, for example:  
   ![Open the GUI](@site/docs/guides/img/how-to-solve-connection-problems.png)