# Como melhorar o suporte para o meu dispositivo

Se o seu dispositivo falha em executar qualquer tarefa, tal como navegar ou reproduzir um ficheiro, é possível que o consiga reparar ao mudar as configurações no arquivo de renderização. Dispositivos/renderizadores/clientes diferentes comunicam com servidores tais como UMS de formas diferentes de modo a que o arquivo de configuração diga ao UMS como falar a mesma linguagem que o seu dispositivo

Temos um ficheiro de configuração de renderização padrão que contém documentação sobre todas as nossas configurações de renderização. Consulte a versão mais recente em https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

Configurações mais comuns para consulta são `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize`, and `ChunkedTransfer`.

Também pode consultar outras configurações de renderização na pasta  "renderizadores" no seu directório de instalação, para ver o que estão a fazer Por vezes vai precisar de ajuda, que facultaremos no nosso fórum, e por favor lembre-se de nos comunicar acerca dos melhoramentos quando o conseguir, de modo a que outros utilizadores com um dispositivo idêntico , possam beneficiar da alteração. Aquando da divulgação da versão e do registo das alterações, ser-lhe-ão atribuídos os créditos.

Se você tiver uma nova configuração de renderização para contribuir com o projeto, por favor crie um **Pull Request** no nosso repositório do GitHub https://github.com/UniversalMediaServer/UniversalMediaServer
