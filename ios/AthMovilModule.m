/**
 * Integración de ATH Móvil (https://github.com/evertec/athmovil-ios-sdk) con React Native.
 *
 * Implementación del módulo React Native y de los métodos de procesamiento de los resultados de ATH Móvil.
 *
 * Este código fuente es propiedad de Namtrik Development y sus asociados, y se prohíbe su uso o reproducción sin autorización.
 *
 *  @author Cristhiam Gabriel Fernández Ruales
*/

#import <React/RCTLinkingManager.h>
#import "AthMovilModule.h"
@import athmovil_checkout;
#import <React/RCTEventDispatcher.h>

@implementation AthMovilModule

// exporta a JS el módulo con el nombre AthMovilModule
RCT_EXPORT_MODULE(ATHMovil);

NSString *APP_SCHEMA;
NSString *VIEW_COMPONENT_PATH = @"paymentresult";

+ (BOOL) requiresMainQueueSetup {
  return false;
}

/**
 * Constantes accesibles desde JS.
 * Estas variables no ofrecen ninguna funcionalidad adicional, solo se proveen para mantener la compatibilidad con Android.
 */
- (NSDictionary *) constantsToExport {
  return @{
    @"TOKEN_FOR_SUCCESS": @"UseOnlyInAndroid",
    @"TOKEN_FOR_FAILURE": @"UseOnlyInAndroid"
  };
}

/**
 * Configura la librería de ATH Móvil para las transacciones.
 * Use AMEnvironmentDevelopment para el modo de desarrollo, AMEnvironmentProduction para el modo de producción.
 * https://github.com/evertec/athmovil-ios-sdk#configure-the-sdk
 */
- (void) configure:(nonnull NSString *)publicToken schema:(nonnull NSString *)schema isProd:(nonnull BOOL):isProd{
  NSError *error = nil;
  if (isProd) {
    [ATHMCheckout.shared configureFor:AMEnvironmentProduction with:publicToken and:schema error:&error];
  } else {
    [ATHMCheckout.shared configureFor:AMEnvironmentDevelopment with:publicToken and:schema error:&error];
  }
  ATHMCheckout.shared.delegate = self;
  APP_SCHEMA = schema;
  if (error != nil) {
    @throw error;
  }
}

/**
 * Convierte los objetos enviados desde JS a objetos ATHMPaymentItem para ser asociados al pago.
 * https://github.com/evertec/athmovil-ios-sdk#create-a-payment-object-with-the-details-of-the-payment
 */
- (NSMutableArray *) parseItems:(NSArray *)items {
  NSMutableArray *parsedItems = [[NSMutableArray alloc] init];
  for (NSObject *item in items) {
    NSError *error;
    ATHMPaymentItem *_item = [[ATHMPaymentItem alloc] initWithDesc:[item valueForKey:@"desc"] name:[item valueForKey:@"name"] priceNumber:[item valueForKey:@"price"] quantity:[[item valueForKey:@"quantity"] intValue] metadata:[item valueForKey:@"metadata"] error:&error];
    if (error != nil) {
      @throw error;
    }
    [parsedItems addObject:_item];
  }
  return parsedItems;
}

/**
 * Invoca el pago en ATH Móvil.
 * https://github.com/evertec/athmovil-ios-sdk#handle-the-payment-button-action
 */
- (void) _pay:(double)timeout total:(NSNumber *)total subtotal:(NSNumber *)subtotal tax:(NSNumber *)tax metadata1:(NSString *)metadata1 metadata2:(NSString *)metadata2 items:(NSArray *)items {
  NSError *error;
  NSMutableArray *parsedItems = [self parseItems:items];
  ATHMPayment *payment = [[ATHMPayment alloc] initWithTotal:total subtotal:subtotal tax:tax metadata1:metadata1 metadata2:metadata2 items:parsedItems error:&error];
  if (error != nil) {
    @throw error;
  }
  ATHMCheckout.shared.timeout = timeout;
  [ATHMCheckout.shared checkoutWith:payment error:&error];
  if (error != nil) {
    @throw error;
  }
}

/**
 * Ejecuta la función de callback JS cuando ocurre un error en el proceso de pago.
 */
- (void) _handleError:(nonnull NSError *)error errorFn:(nonnull RCTResponseSenderBlock)errorFn {
  // mensajes de los errores de la librería ya que no están disponibles en objective-c
  switch (error.code) {
    case 0:
      errorFn(@[@"Required URL query not found"]);
      break;
    case 1:
      errorFn(@[@"Malformed URL Exception"]);
      break;
    case 2:
      errorFn(@[@"Decoding JSON Exception"]);
      break;
    case 3:
      errorFn(@[@"Required JSON Properties Not Found"]);
      break;
    case 4:
      errorFn(@[@"Decoding Data Exception"]);
      break;
    case 5:
      errorFn(@[@"Encoding JSON Exception"]);
      break;
    case 6:
      errorFn(@[@"Api Token Or Callback URL Not Provided"]);
      break;
    case 7:
      errorFn(@[@"Payment Canceled"]);
      break;
    case 8:
      errorFn(@[@"Payment Failed"]);
      break;
    case 9:
      errorFn(@[@"Transaction Expired"]);
      break;
    case 10:
      errorFn(@[@"Timeout Out Of Range"]);
      break;
    case 11:
      errorFn(@[@"Business Not Available"]);
      break;
    case 12:
      errorFn(@[@"Special Characters Not Allowed"]);
      break;
    default:
      errorFn(@[error.localizedDescription]);
      break;
  }
}

/**
 * Solicita el pago a través de ATH Móvil.
 *
 * schema: esquema URL de la app
 * publicToken: identificador del comercio al que se pagará
 * total: cantidad total del pago (subtotal + impuesto)
 * subtotal: cantidad subtotal del pago (total - impuestos)
 * tax: cantidad de impuestos del pago
 * metadata1: texto con datos adicionales
 * metadata2: texto con datos adicionales
 * items: lista de items de la transacción
 * errorFn: función callback de JS que se ejecutará si ocurre un error
 */
RCT_EXPORT_METHOD(pay:(nonnull NSString *)schema publicToken:(nonnull NSString *)publicToken total:(nonnull NSNumber *)total subtotal:(nonnull NSNumber *)subtotal tax:(nonnull NSNumber *)tax metadata1:(NSString *)metadata1 metadata2:(NSString *)metadata2 items:(NSArray *)items isProd:(nonnull BOOL)isProd errorFn:(nonnull RCTResponseSenderBlock)errorFn) {
  @try {
    [self configure:publicToken schema:schema isProd:isProd];
    [self _pay:600 total:total subtotal:subtotal tax:tax metadata1:metadata1 metadata2:metadata2 items:items];
  }
  @catch (NSError *error) {
    [self _handleError:error errorFn:errorFn];
  }
}

/**
 * Solicita el pago a través de ATH Móvil con un tiempo de espera determinado.
 *
 * schema: esquema URL de la app
 * publicToken: identificador del comercio al que se pagará
 * total: cantidad total del pago (subtotal + impuesto)
 * subtotal: cantidad subtotal del pago (total - impuestos)
 * tax: cantidad de impuestos del pago
 * metadata1: texto con datos adicionales
 * metadata2: texto con datos adicionales
 * items: lista de items de la transacción
 * errorFn: función callback de JS que se ejecutará si ocurre un error
 */
RCT_EXPORT_METHOD(payWithTimeout:(double)timeout schema:(NSString *)schema publicToken:(nonnull NSString *)publicToken total:(nonnull NSNumber *)total subtotal:(nonnull NSNumber *)subtotal tax:(nonnull NSNumber *)tax metadata1:(NSString *)metadata1 metadata2:(NSString *)metadata2 items:(NSArray *)items isProd:(nonnull BOOL)isProd errorFn:(nonnull RCTResponseSenderBlock)errorFn) {
  @try {
    [self configure:publicToken schema:schema isProd:isProd];
    [self _pay:timeout total:total subtotal:subtotal tax:tax metadata1:metadata1 metadata2:metadata2 items:items];
  }
  @catch (NSError *error) {
    [self _handleError:error errorFn:errorFn];
  }
}

/**
 * Parsea la lista de items pagados a una cadena JSON para ser enviado a JS.
 */
- (NSString *) getJSONFromItems:(NSArray<ATHMPaymentItem *> *)items {
  NSMutableArray *parsedItems = [[NSMutableArray alloc] init];
  for (ATHMPaymentItem *item in items) {
    NSDictionary *_item = @{@"desc": item.desc, @"name": item.name, @"price": item.price, @"quantity": [NSNumber numberWithLong:item.quantity], @"metadata": item.metadata};
    [parsedItems addObject:_item];
  }
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:parsedItems options:NSJSONWritingPrettyPrinted error:nil];
  NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  return jsonString;
}

/**
 * Carga la componente de react native que procesará la respuesta del pago.
 */
- (void) callJSResponseView:(nonnull NSString *)status referenceNumber:(nonnull NSString *)referenceNumber total:(nonnull NSNumber *)total tax:(nonnull NSNumber *)tax subtotal:(nonnull NSNumber *)subtotal metadata1:(nonnull NSString *)metadata1 metadata2:(nonnull NSString *)metadata2 items:(NSArray<ATHMPaymentItem *> *)items {
  NSString *stringItems = [self getJSONFromItems:items];
  // from Pods/Development Pods/React-RCTLinking/RCTLinkingManager.m
  NSString *kOpenURLNotification = @"RCTOpenURLNotification";
  NSString *URL = [NSString stringWithFormat:@"%@://%@/%@/%@/%@/%@/%@/%@/%@/%@", APP_SCHEMA, VIEW_COMPONENT_PATH, status, referenceNumber, total, tax, subtotal, metadata1, metadata2, stringItems];
  NSDictionary<NSString *, id> *payload = @{@"url": URL};
  [[NSNotificationCenter defaultCenter] postNotificationName:kOpenURLNotification object:self userInfo:payload];
}

/**
 * Procesa un pago cancelado.
 */
- (void) onCancelledPaymentWithReferenceNumber:(NSString * _Nullable)referenceNumber total:(NSNumber * _Nonnull)total tax:(NSNumber * _Nullable)tax subtotal:(NSNumber * _Nullable)subtotal metadata1:(NSString * _Nullable)metadata1 metadata2:(NSString * _Nullable)metadata2 items:(NSArray<ATHMPaymentItem *> * _Nullable)items {
  [self callJSResponseView:@"CANCELLED" referenceNumber:referenceNumber total:total tax:tax subtotal:subtotal metadata1:metadata1 metadata2:metadata2 items:items];
}

/**
 * Procesa un pago ejecutado exitosamente.
 */
- (void) onCompletedPaymentWithReferenceNumber:(NSString * _Nullable)referenceNumber total:(NSNumber * _Nonnull)total tax:(NSNumber * _Nullable)tax subtotal:(NSNumber * _Nullable)subtotal metadata1:(NSString * _Nullable)metadata1 metadata2:(NSString * _Nullable)metadata2 items:(NSArray<ATHMPaymentItem *> * _Nullable)items {
  [self callJSResponseView:@"COMPLETED" referenceNumber:referenceNumber total:total tax:tax subtotal:subtotal metadata1:metadata1 metadata2:metadata2 items:items];
}

/**
 * Procesa un pago expirado (inválido).
 */
- (void) onExpiredPaymentWithReferenceNumber:(NSString * _Nullable)referenceNumber total:(NSNumber * _Nonnull)total tax:(NSNumber * _Nullable)tax subtotal:(NSNumber * _Nullable)subtotal metadata1:(NSString * _Nullable)metadata1 metadata2:(NSString * _Nullable)metadata2 items:(NSArray<ATHMPaymentItem *> * _Nullable)items {
  [self callJSResponseView:@"EXPIRED" referenceNumber:referenceNumber total:total tax:tax subtotal:subtotal metadata1:metadata1 metadata2:metadata2 items:items];
}

@end
