# Como melhorar o suporte para o meu dispositivo

Se o seu dispositivo falha em executar qualquer tarefa, tal como navegar ou reproduzir um ficheiro, é possível que o consiga reparar ao mudar as configurações no arquivo de renderização. Dispositivos/renderizadores/clientes diferentes comunicam com servidores tais como UMS de formas diferentes de modo a que o arquivo de configuração diga ao UMS como falar a mesma linguagem que o seu dispositivo

Every configuration profile serves two purposes:
- Allow UMS to recognize a specific renderer when it tries to connect
- Define the possibilities of that renderer

Temos um ficheiro de configuração de renderização padrão que contém documentação sobre todas as nossas configurações de renderização. Consulte a versão mais recente em https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

## Adding support for an unrecognized device

When UMS does not recognize your device, it means none of the renderer configuration profiles match your device. The result is that UMS displays an `Unknown Renderer`, and since it does not know the possibilities of your renderer, it cannot provide optimized output for your device.

The solution is to try creating your own renderer configuration file.
1. Make a copy of the .conf file that is closest to your device. For example, if your Samsung TV is not recognized, one of the Samsung TV configs might be a good place to start from.

1. Go to the `Logs` tab in UMS and look for the text `Media renderer was not recognized. Possible identifying HTTP headers:`. That information is what is needed to make UMS recognize your device.

1. In your new .conf file, look for the line that defines `UserAgentSearch` and/or `UpnpDetailsSearch` and replace the values with that identifying information.

1. Browse and play some media on your device. Take note of which media had a problem playing. Now you can move on to the next section to improve support for your device.

## Improving support for a device

1. If any of your media has a problem playing, the renderer config should be modified until it works. Refer to [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf) for the full list of options. The most common ones to change are:
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Make sure you do not have `MediaInfo = false` in your new config, because that will stop the `Supported` lines from working.

1. To make sure transcoding is working on your device, play a file from the `#--TRANSCODE--#` folder. Within that folder, play one of the `FFmpeg` entries. If it plays, then transcoding is working.

1. The `Supported` lines need to be populated to tell UMS which files your device supports natively. It can be a good idea to find the manual for your device online and use that to help populate those lines.

1. Também pode consultar outras configurações de renderização na pasta  "renderizadores" no seu directório de instalação, para ver o que estão a fazer Por vezes vai precisar de ajuda, que facultaremos no nosso fórum, e por favor lembre-se de nos comunicar acerca dos melhoramentos quando o conseguir, de modo a que outros utilizadores com um dispositivo idêntico , possam beneficiar da alteração. Aquando da divulgação da versão e do registo das alterações, ser-lhe-ão atribuídos os créditos.
