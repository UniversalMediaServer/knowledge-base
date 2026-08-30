# Geliştirme

Bu belge kendi değişikliklerinizi nasıl yapacağınızı ve çalıştıracağınızı açıklar.

## Kodu makinenize çatallamayla ikiye ayırma

GitHub, geliştiricilerin kendi ince ayarlarını veya özelliklerini eklemek için resmi UMS kaynaklarının kendi sürümlerini çatallamalarını çok kolaylaştırır. GitHub, bu özelliklerin resmi UMS geliştirme ekibine "Çekme İstekleri" olarak gönderilmesini kolaylaştırır.

- [GitHub geliştirme için makinenizi ayarlayın](https://support.github.com/)

- [GitHub UMS deposuna](https://github.com/universalmediaserver/universalmediaserver) gidin ve sağ üstteki `Fork` düğmesine basın.

- Yeni GitHub deposunu yerel makinenize çoğaltın. Çoğaltma URL’si deponuzun ana sayfasında görülebilir. Bu, şunun gibi bir şey olmalı (ADINIZI asıl GitHub adınızla değiştirin):

        git clone git@github.com:ADINIZ/universalmediaserver.git ADINIZ

Artık yerel makinenizde yeni deponuz var.

## IDE’lerle Geliştirme

### [VS Kodu](https://code.visualstudio.com/)

Bizim İki ana dilimiz olan Java ve TypeScript’i kullanma konusunda mükemmel olduğundan bu tavsiye ettiğimiz düzenleyicidir.

#### Java sunucusu

Kodu açtığınızda, muhtemelen `Java için Uzantı Paketi` gibi yüklenecek Uzantılar için bazı öneriler göreceksiniz. Bunu/bunları yükleyin.
Yüklendiğinde ve yapılandırıldığında, Java sunucusunu üstteki `Çalıştır -> Hata Ayıklamayı Başlat` seçeneğine tıklayarak çalıştırabilir ve `Çalıştır -> Hata Ayıklamayı Yeniden Başlat` ile yeniden yükleyebilirsiniz. Hızlı bir geliştirme iş akışı için bu komutların 1 saniye içinde tamamlanması gerekir.

#### Web tarayıcı arayüzleri

Eğer web tarayıcı arayüzlerimizde değişiklik yapmak istiyorsanız, TypeScript kodunun derlenmesi ve sunulmasıyla ilgilenecek olan React sunucusunu da çalıştırmanız gerekecektir.

VS Kodunda, `Komut Paleti`’ne gidebilir ve `Hata Ayıklama: Hata Ayıklamayı Seç ve Başlat`’ta süzebilir ve `Web arayüzünü başlat`’ı seçebilirsiniz. React dosyalarında yaptığınız değişiklikleri otomatik olarak yeniden yükleyecektir.

Elle bir iş akışı için `react-client` klasörüne gidebilir ve gerekli bağımlılıkları indirmek için `yarn` komutunu çalıştırabilirsiniz. Daha sonra web oynatıcısını tarayıcıda açacak ve yaptığınız kod değişikliklerini otomatik olarak derleyecek olan `yarn dev` komutunu çalıştırın.

Web ayarları arayüzü için `react-client/package.json` dosyasını açabilir ve proksi bağlantı noktasını `9002`’den `9001`’e değiştirebilirsiniz. Artık `yarn dev`, web oynatıcısı yerine web ayarlarına hizmet etmelidir.

### [Eclipse](http://www.eclipse.org/downloads/)

- m2e Eclipse eklentisini yükleyin (https://eclipse.org/m2e/)

- EGit Eclipse eklentisini yükleyin (https://eclipse.org/egit/)

- Eclipse’de "Pencere > Görünümü Göster > Git Depoları" menüsünü seçin. Ardından "Pencere > Gezinme > Görünüm Menüsünü Göster"i seçin ve "Depo Ekle"yi seçin.
  Deponuzu çoğalttığınız dizine göz atın ve "Ara" düğmesine basın. Çatallanan deponuzu seçin ve "Tamam"a basın.
  Depo, Git Depoları görünümünde görünmelidir.

- Depoda farenin sağ tuşuna basın ve menüden "Maven Projelerini İçe Aktar" seçeneğini seçin. "/pom.xml" projesini seçin ve "Bitir"e basın.

  Note: if a project with the same name already exists, click "Advanced" and
  set the "Name template" to `[artifactId]-YOURNAME` (replace YOURNAME with
  your GitHub name). Then press "Finish".

You now see the sources in Eclipse, but the project is still missing the "Git"
nature. In other words, it is not tied to the local repository yet. This means
you cannot perform any Git actions from Eclipse yet. Add the missing connection
by sharing the project:

- Press the right mouse button on the newly created project and select the
  menu "Team > Share Project...". Select "Git" and press "Next >".
  Check the checkbox "Use or create repository in parent folder of project"
  and make sure the project is selected. Then press "Finish".

Verify that your project is now under Git control. Press the right mouse
button on the project and under "Team" you now see all options to work with
Git.

You can build UMS from Eclipse:

- Create a new run configuration under "Run > Run Configurations...", right
  mouse button on "Maven Build", select "New", Name: `Build UMS`, Goals:
  `package`. Select the tab "JRE" and add the following VM arguments
  `-Xmx1500m -XX:MaxPermSize=256m`. Finally, press the "Apply" button.

You will want to run UMS from Eclipse while developing. This is how you do it:

- Create a new run configuration under "Run > Run Configurations...", right
  mouse button on "Maven Build", select "New", Name: `Run UMS`, Base
  directory: `${project_loc}`, Goals: "test", Profiles: `run-from-eclipse`.
  Select the tab "JRE" and add VM arguments `-Xmx1500m -XX:MaxPermSize=256m`.
  Finally, press the "Apply" button.

You are now ready to start developing!

When you are happy with your changes, you can commit them to your local
repository from Eclipse using right mouse button, "Team > Commit...".

When you are satisfied with your commits and want to publish them to your
repository at GitHub, you can press the right mouse button on the project and
select "Team > Push to Upstream".

## Contributing your change back to us

If you would like to contribute to the UMS project, you can send a "Pull Request" to the development team. See [Creating a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) for more details.