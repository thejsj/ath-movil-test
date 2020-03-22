/**
 * Integración de ATH Móvil (https://github.com/evertec/athmovil-ios-sdk) con React Native.
 *
 * Definición de la interface del módulo. Esta interface integra el módulo nativo de React Native para su ejecución en el contexto de JavaScript (https://facebook.github.io/react-native/docs/native-modules-ios) y la interface de respuesta de pagos de ATH Móvil (https://github.com/evertec/athmovil-ios-sdk#implement-the-response-delegate-on-your-controller).
 *
 * Este código fuente es propiedad de Namtrik Development y sus asociados, y se prohíbe su uso o reproducción sin autorización.
 *
 *  @author Cristhiam Gabriel Fernández Ruales
 */

#import <React/RCTBridgeModule.h>
@import athmovil_checkout;

@interface AthMovilModule : NSObject <RCTBridgeModule, AMCheckoutDelegate>
@end
