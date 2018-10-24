#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <Ticker.h>
#include "DHT.h"

// Set these to run example.
#define FIREBASE_HOST "ionic-iot-18a78.firebaseio.com"
#define FIREBASE_AUTH "XSuRYEjtQjtL0DyzlEqg3J5kREMt5bFl8OSGGYSW"
#define WIFI_SSID "SKY_A2137E"
#define WIFI_PASSWORD "6c159f6e"

#define LAMP_PIN D3
#define DHT_PIN D5
#define DHTTYPE DHT11
// Publique a cada 5 min
#define PUBLISH_INTERVAL 1000*60*10

DHT dht(DHT_PIN, DHTTYPE);
Ticker ticker;
bool publishNewState = true;

void publish(){
  publishNewState = true;
}

void setupPins(){

  pinMode(LAMP_PIN, OUTPUT);
  digitalWrite(LAMP_PIN, LOW);
  
  dht.begin();  
}

void setupWifi(){
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
}

void setupFirebase(){
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setBool("lamp", false);
}

void setup() {
  Serial.begin(9600);

  setupPins();
  setupWifi();    

  setupFirebase();

  // Registra o ticker para publicar de tempos em tempos
  ticker.attach_ms(PUBLISH_INTERVAL, publish);
}

void loop() {

  // Apenas publique quando passar o tempo determinado
  if(publishNewState){
    Serial.println("Publish new State");
    // Obtem os dados do sensor DHT 
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();
  
    if (isnan(temperature) || isnan(humidity)) 
    {
      Serial.println("Failed to read from DHT");
    } 
    else
    {
      Firebase.pushFloat("temperature", temperature);
      Firebase.pushFloat("humidity", humidity);    
      publishNewState = false;
    }

  }

  // Verifica o valor da lampada no firebase 
  bool lampValue = Firebase.getBool("lamp");
  digitalWrite(LAMP_PIN, lampValue ? HIGH : LOW);
  
  delay(200);
}
