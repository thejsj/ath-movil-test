# Integración de ATH Móvil

Esta receta muestra la integración de las librerías nativas (Android e iOS) de pagos móviles ATH 
Móvil en un proyecto de React Native.

La librería ATH Móvil funcionan como un puente de interacción entre la aplicación cliente 
(merchat/mercado) y la aplicación de pagos [ATH Móvil](https://portal.athmovil.com/). ATH Móvil 
permite a los usuarios transferir dinero a otras personas, hacer donaciones y realizar pagos al 
instante.

## Requerimientos

* Proyeto creado con React Native Vanilla (react-native init)
* Conocimientos de React Native
* Conocimientos básicos de JAVA (Android nativo)
* Conocimientos básicos de Objective C (iOS nativo)
* Conocimientos básicos de Swift (iOS nativo)

## Instalación

### Android

Antes de empezar, se debe configurar la librería nativa en el proyecto de android. Para más 
información revise el [repositorio del proyecto](https://github.com/evertec/athmovil-android-sdk#installation).

* JitPack ya está configurado en el proyecto generado por react native, así que no es necesario
agregarlo.
* Agregar el SDK de ATH Móvil y la librería GSON a las dependencias de la aplicación en 
[`android/app/build.gradle`](./android/app/build.gradle#L185-L86)

  ```groovy
  ...
  dependencies {
    ...
  
    implementation 'com.github.evertec:athmovil-android-sdk:2.0.0'
    implementation 'com.google.code.gson:gson:2.8.2'
  
    ...
  }
  ...
  ```

* Copiar el paquete `athmovil` ubicado en [android/app/src/main/java/com/athmovil/athmovil](./android/app/src/main/java/com/athmovil/athmovil) al código fuente de tu aplicación.  
  El paquete contiene dos clases [`ATHMovilModule`](./android/app/src/main/java/com/athmovil/athmovil/ATHMovilModule.java), 
  [`ATHMovilPackage`](./android/app/src/main/java/com/athmovil/athmovil/ATHMovilPackage.java)
* Registre el paquete nativo en los paquetes de react native, en el archivo [MainApplication](./android/app/src/main/java/com/athmovil/athmovil/ATHMovilModule.java), 
[`ATHMovilPackage`](./android/app/src/main/java/com/athmovil/MainApplication.java)

  ```java
  ...
  import com.tu-app-name.athmovil.ATHMovilPackage; // <-- agregue esta línea con el nomvre de su   paquete
  ...
  
  protected List<ReactPackage> getPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
    List<ReactPackage> packages = new PackageList(this).getPackages();
    // Packages that cannot be autolinked yet can be added manually here, for example:
    // packages.add(new MyReactNativePackage());
    packages.add(new ATHMovilPackage()); // <-- agregue esta línea
    return packages;
  }
  ...
  ```

* Configurar la versión mínima del SDK de android en `19` en el archivo [`android/build.gradle`](./android/build.gradle)

  ```groovy
  ...
  minSdkVersion = 19
  ...
  ```

* Configure en [`android/app/src/main/AndroidManifest.xml`](./android/app/src/main/AndroidManifest.xml#L14-L19) la actividad que recibirá el resultado del pago

  ```xml
  ...
  <activity android:name=".athmovil.CheckoutResultActivity">
    <intent-filter>
      <action android:name="com.athmovil.ATHMRESPONSE" /> <!-- configure aquí el paquete de su aplicación y el nombre del filtro/esquema que usará en la solicitud de pago -->
      <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
  </activity>
  ...
  ```

* Habilite el [Deep Linking](https://en.wikipedia.org/wiki/Mobile_deep_linking) en su librería de enrutamiento y navegación.

  Se recomienda el uso de [React Navigation](https://reactnavigation.org/en) como librería de enrutamiento y navegación. Ver [Deep Linking en React Navigation](https://reactnavigation.org/docs/en/deep-linking.html).

* Por último, configure el esquema de Deep Linking que usó en su librería de enrutamiento y navegación en la vista que recibe el resultado del pago en [android/app/src/main/java/com/athmovil/athmovil/CheckoutResultActivity.java](./android/app/src/main/java/com/athmovil/athmovil/CheckoutResultActivity.java#L18-L19).

  ```java
  ...
  private String APP_SCHEMA = "athmoviltest"; // configure el usado en la lib. de enrutamiento y navegación
  private String VIEW_COMPONENT_PATH = "paymentresult";  // configure el usado en la lib. de enrutamiento y navegación
  ...
  ```

### iOS

#### Simulador

Al contrario de Android, la librería ofrece un simulador de transacciones para iOS. Para instalarlo, 
descargue el [repositorio de la librería para iOS](https://github.com/evertec/athmovil-ios-sdk) y 
abra el proyecto `athmovil-ios-sdk-master/Simulator/ath-simulator.xcodeproj` en Xcode. Ejecute el 
proyecto en el simulador iOS de preferencia desde el cual se llevará a cabo el desarrollo.

##### Errores conocidos del simulador

* **El simulador no se abre al presionar el botón de pago:** el esquema de apertura del simulador se
encuentra mal configurada. Abra el proyecto del simulador en Xcode, seleccione el proyecto en el 
panel izquierdo, en la pestaña `Info` despliegue la categoría `URL Types`.
  Verá que el esquema predeterminado está configurado en `athm-simulator`, agregue uno nuevo con el
  esquea `athm`.

  ![Screenshot 3](./images/screenshot_3.png)

#### Integración con react native

Al igua que en Android, configure la librería native en el proyecto ios. Para más información revise 
el [repositorio del proyecto](https://github.com/evertec/athmovil-ios-sdk).

* Agregar el SDK de ATH Móvil a las dependencias de IOS en el archivo [Podfile](./ios/Podfile)

  ```swift
  ...
  target 'myproject' do
  use_frameworks! # usando frameworks en lugar de librerías estáticas
  ...
  pod 'athmovil-checkout', :git => 'https://github.com/evertec/athmovil-ios-sdk.git'

  target 'athmovilTests' do
  ...
  ```

* Configure el target mínimo de despliegue en `10`

  ```swift
  platform :ios, '10.0'
  ```

* La librería de ATH Móvil está escrita en Swift, mientras que el proyecto de React Native en 
Objective-C, por lo tanto debe configurar la variable `SWIFT_VERSION` en el proyecto. Usando Xcode abra 
el archivo `miproyecto.xcworkspace`.

  Seleccione el proyecto en el panel izquierdo, luego seleccione la pestaña `Build Settings`.

  ![Screenshot 2](./images/screenshot_1.png)

  Para agregar la configuración haga clic en el botón `+` y seleccione la opción `Add User-Defined Setting`.
  Asigne el nombre `SWIFT_VERSION` y el valor `5.0`.

  ![Screenshot 2](./images/screenshot_2.png)

* Instalar las dependencias del proyecto.

  ```shell
  cd ios
  pod install
  cd ..
  ```

* Copiar los archivos [ios/AthMovilModule.h](./ios/AthMovilModule.h) e [ios/AthMovilModule.m](./ios/AthMovilModule.m) a la `ios` de su proyecto.

* Configure la ruta del componente de vista de react native que procesará el resultado del pago en el 
[ios/AthMovilModule.m:22](./ios/AthMovilModule.m#L22)

  ```objectivec
  ...
  NSString *VIEW_COMPONENT_PATH = @"PATH_TO_JS_VIEW_COMPONENT";
  ...
  ```

* Por último configure el modo de ejecución de la librería (desarrollo o producción) en el archivo 
[ios/ATHMovilModule.m:46](./ios/AthMovilModule.m#L46)

  ```objectivec
  ...
  // modo desarrollo
  [ATHMCheckout.shared configureFor:AMEnvironmentDevelopment with:publicToken and:schema error:&error];
  // modo producción
  [ATHMCheckout.shared configureFor:AMEnvironmentDevelopment with:publicToken and:schema error:&error];
  ...
  ```

##### Errores conocidos

* **Caracteres especiales:** la librería presenta una validación en los datos de tipo cadena, en la 
cual no se permiten caracteres especiales. Tenca cuidado al enviar tildes, eñes u otro caracter 
especial.

* **`referenceNumber` nulo:** en el modo de desarrollo las transacciones completadas exitosamente los 
datos no son bien procesados, este es un error de la librería.

## Uso

### Botón de pago

El botón de pago es implementado en Javascript por ser un elemento de UI y no tiene ninguna 
funcionalidad asociada.

```javascript
import PayButton from 'athmovil/PayButton';
<PayButton
  language="es"
  theme="dark"
  onPress={
    () => console.log('checking out')
  } />
```

#### Propiedades

| Propiedad | Tipo   | Valores                     | Default    |
|-----------|--------|-----------------------------|------------|
| language  | String | "es", "en"                  | "en"       |
| theme     | String | "original", "light", "dark" | "original" |

Vea el [uso del botón](https://github.com/evertec/athmovil-android-sdk#usage) en la librería nativa 
para más detalles.

### Pago

Para facilitar el uso de la librería se expone el módulo `ATHMPayment` el cual ejecuta de forma 
nativa el llamado a la app de ATH Móvil para el procesamiento del pago.

| Parámetro   | Tipo    | Requerido | Descripción                                                                                                                                      |
|-------------|---------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| timeout     | Integer | Si        | Tiempo de expiración del proceso de pago.  Default: 600 segundos (10 minutos). Use `payWithTimeout`.                                             |
| schema      | String  | Si        | Esquema de llamado que se usará cuando se complete el pago.                                                                                      |
| publicToken | String  | Si        | Determina la cuenta del negocio al cual se va a pagar.                                                                                           |
| total       | Double  | Si        | Cantidad total que será pagada por el usuario.                                                                                                   |
| subtotal    | Double  | Si        | Cantidad del subtotal que se mostrará en la aplicación.                                                                                          |
| tax         | Double  | Si        | Cantidad del impuesto que se mostrará en la aplicación.                                                                                          |
| metadata1   | String  | Si        | Campo para información adicional sobre el pago.                                                                                                  |
| metadata2   | String  | Si        | Campo para información adicional sobre el pago.                                                                                                  |
| items       | String  | Si        | Lista con los productos que se pagan. (“name”, “desc”, "quantity", “price”, “metadata”)                                                          |
| errorFn     | String  | Si        | Callback que se ejecutará al ocurrir un error en el pago.                                                                                        |

```javascript
import ATHMPayment from 'athmovil/ATHMPayment';

const items = [
  {
    name: "Cake",
    desc: "(8oz)",
    price: 0.25,
    quantity: 2,
    metadata: "employee discount"
  },
  {
    name: "Coca Cola",
    desc: "(68oz)",
    price: 0.75,
    quantity: 1,
    metadata: "expiration 0820"
  }
];

onError(message) { alert(message); }

// pago sin timeout
ATHMPayment.pay('CALLBACKSCHEMA', "PUBLICTOKEN", 1.12, 1.0, 0.12, "Meta data 1", "Meta data 2", items,
  onError);

// pago con timeout personalizado
ATHMPayment.payWithTimeout(1200, 'CALLBACKSCHEMA', "PUBLICTOKEN", 1.12, 1.0, 0.12, "Meta data 1",
  "Meta data 2", items, onError);
```

### Respuesta del pago

La librería pone a disposición de React Native los siguientes valores que son retornados por el pago. Ver [CheckoutResult.js](./CheckoutResult.js)

| Parámetro       | Tipo   | Descripción                                                                                                                                       |
|-----------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| status          | String | "COMPLETED" si el pago fue realizado exitosamente. "CANCELLED" si el pago fue cancelado por el usuario. "EXPIRED" se terminó el tiempo de espera. |
| referenceNumber | String | ID de referencia de la transacción de pago si se realizó exitosamente.                                                                            |
| total           | String | Cantidad total de la transacción.                                                                                                                 |
| tax             | String | Cantidad de impuestos de la transacción.                                                                                                          |
| subtotal        | Double | Cantidad sin impuestos de la transacción.                                                                                                         |
| metadata1       | Double | Datos adicionales.                                                                                                                                |
| metadata2       | Double | Datos adicionales.                                                                                                                                |
| items           | String | Lista de elementos pagados.                                                                                                                       |

## Pasos siguientes

* Implementar baterías de pruebas para Android e iOS.
* Empaquetamiento de la integración en un módulo de react native para un aprovisionamiento más simple.
* Empaqetar el uso del módulo en un objecto JS que permita una máxima similitud a las librerías nativas.
