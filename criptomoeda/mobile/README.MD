<div align="center">
  <br/></br>

  <b>
    <p>Aplicação desenvolvida para visualizar/listrar e obter informação de criptomoedas!</p>
  </b>

  <br/>

</div>

</br>

</br></br>

# Índice

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias)
- [Como Usar](#como-usar)

<a id="sobre"></a>

## 📖 Sobre

<p>
  Essa aplicação foi desenvolvida durante o teste da fluke.
</p>
<p>
  O objetivo foi criar uma aplicação onde fosse possivel listar a "top" criptomoedas, visualizar informação da moeda, como historico e um sistema de login simples.
</p>

<p>

> Você pode acessar o mobile clicando <a href="https://github.com/filipebsmaia/fluke/tree/master/criptomoeda/mobile">aqui</a>.

</p>

<a id="tecnologias"></a>

## 🚀 Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://github.com/axios/axios)
- [DateFNS](https://date-fns.org/)
- [ReactNative](https://pt-br.reactjs.org/)
- [ReactNativeChartKit](https://github.com/indiespirit/react-native-chart-kit)
- [ReactNavigation](https://reactnavigation.org/)
- [ReactNativeIphoneXHelper](https://github.com/ptelad/react-native-iphone-x-helper)
- [ReactNativeSafeAreaContext](https://github.com/th3rdwave/react-native-safe-area-context)
- [ReactNativeScreens](https://github.com/software-mansion/react-native-screens)
- [ReactNativeSvg](https://github.com/react-native-community/react-native-svg)
- [ReactNativeVectorIcons](https://github.com/oblador/react-native-vector-icons)
- [StyledComponents](https://www.styled-components.com/)
- [Unform](https://unform.dev/)
- [Yup](https://github.com/jquense/yup)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

<a id="como-usar"></a>

## 🔎 Como usar

### **Pré-requisitos:**

Para clonar a aplicação você ira precisar do [Git](https://git-scm.com), [Node.js v12.16.3](https://nodejs.org/) ou maior + [Yarn v1.17.3](https://yarnpkg.com/) ou maior instalado em seu computador.

> Antes de proseguir configure o endereço da api dentro da pasta do projeto no arquivo `.src/services/api.ts`. Basta alterar o `baseURL` para o endereço que sua api está rodando.

Configurando aplicação:

```sh
  # Clone o repósitorio
  $ git clone https://github.com/filipebsmaia/fluke

  ## Acesse o diretorio do app
  $ cd fluke/criptomoeda/mobile

  ## Instale as dependencias
  $ yarn

  ## Instalando aplicação em seu emulador/dispositivo

  ### android
  $ yarn android

  ### android
  $ cd ios
  $ pod install
  $ cd ..
  $ yarn ios

  ## Iniciando aplicação
  $ yarn start

```

> Esta aplicação testada apenas em ambiente android, porem foi usada algumas estrategias para que funcione também em ios... para ter a mesma esperiencia do desenvolvedor aconselha-se que utilize um dispositivo/emulador android!

<div align="center">
<h4>
    Feito com 💜 por <a href="https://www.linkedin.com/in/filipebsmaia/" target="_blank">Filipe Maia</a>
</h4>
</div>
