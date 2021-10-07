import { ONE_LEVEL } from '../constants'
import { firstLevelPostalCodes } from '../transforms/postalCodes'
import { getOneLevel, getTwoLevels } from '../transforms/addressFieldsOptions'

const countryData = {
  Azuay: {
    Amaluza: '0000',
    Asuncion: '0000',
    Baños: '0000',
    'Bulan (Jose Victor Izquierdo)': '0000',
    'Camilo Ponce Enriquez': '0000',
    Chaucha: '0000',
    'Checa (Jidcay)': '0000',
    'Chican (Guillermo Ortega)': '0000',
    Chiquintad: '0000',
    Chumblin: '0000',
    Chordeleg: '0000',
    Cochapata: '0000',
    'Cuchil (Cutchil)': '0000',
    Cuenca: '0000',
    Cumbe: '0000',
    'Daniel Cordova Toral (El Oriente)': '0000',
    'Dug Dug': '0000',
    'El Pan': '0000',
    'El Cabo': '0000',
    'El Carmen de Pijili': '0000',
    'El Progreso (Cab. en Zhota)': '0000',
    Giron: '0000',
    Guachapala: '0000',
    Gualaceo: '0000',
    Guarainag: '0000',
    Guel: '0000',
    Jadan: '0000',
    'Jima (Gima)': '0000',
    'La Union': '0000',
    'Las Nieves (Chaya)': '0000',
    Llacao: '0000',
    Ludo: '0000',
    'Luis Cordero Vega': '0000',
    'Luis Galarza Orellana (Cab. en Delegsol)': '0000',
    'Mariano Moreno': '0000',
    Molleturo: '0000',
    Nabon: '0000',
    Nulti: '0000',
    'Octavio Cordero Palacios (Santa Rosa)': '0000',
    Oña: '0000',
    Paccha: '0000',
    Palmas: '0000',
    Paute: '0000',
    'Ponce Enriquez': '0000',
    Principal: '0000',
    Pucara: '0000',
    Quingeo: '0000',
    'Remigio Crespo Toral (Gulag)': '0000',
    Ricaurte: '0000',
    'San Bartolome': '0000',
    'San Cristobal (Carlos Ordoñez Lazo)': '0000',
    'San Felipe de Oña': '0000',
    'San Fernando': '0000',
    'San Gerardo': '0000',
    'San Joaquin': '0000',
    'San Jose de Raranga': '0000',
    'San Juan': '0000',
    'San Martin de Puzhio': '0000',
    'San rafael de Sharug': '0000',
    'Santa Isabel': '0000',
    Sayausi: '0000',
    'Sevilla De Oro': '0000',
    Sidcay: '0000',
    'Simon Bolivar (Cab. en Gañanzol)': '0000',
    Sigsig: '0000',
    Sinincay: '0000',
    Sosudel: '0000',
    Tarqui: '0000',
    Tomebamba: '0000',
    Turi: '0000',
    Valle: '0000',
    'Victoria del Portete (Irquis)': '0000',
    'Zhaglli (Shaglli)': '0000',
    Zhidmad: '0000',
  },
  Bolivar: {
    '1° de Mayo': '0001',
    '4 esquinas': '0001',
    Asunción: '0001',
    Balzapamba: '0001',
    Caluma: '0001',
    Chillanes: '0001',
    Chimbo: '0001',
    Echeandia: '0001',
    'Facundo Vela': '0001',
    Guaranda: '0001',
    'Las Naves': '0001',
    'La Magdalena': '0001',
    'Julio E. Moreno (Catanahuan Grande)': '0001',
    'Pisagua Alto': '0001',
    'Pisagua Bajo': '0001',
    'Recinto 24 de Mayo': '0001',
    'Recinto El Palmar': '0001',
    'Recinto La Maritza': '0001',
    'Regulo de Mora': '0001',
    Salinas: '0001',
    'San Jose de Chimbo': '0001',
    'San Jose del Tambo (Tambopamba)': '0001',
    'San Lorenzo': '0001',
    'San Luis de Pambil': '0001',
    'San Miguel de Bolivar': '0001',
    'San Pablo de Atenas': '0001',
    'San Pedro de Guanujo': '0001',
    'San Sebastian': '0001',
    'San Simon (Yacoto)': '0001',
    'Santa Fe': '0001',
    Simiatug: '0001',
    Telimbela: '0001',
    Vinchoa: '0001',
  },
  Canar: {
    Azogues: '0002',
    Biblian: '0002',
    Cañar: '0002',
    Chontamarca: '0002',
    Chorocopte: '0002',
    Cochancay: '0002',
    Cojitambo: '0002',
    Deieeg: '0002',
    Deleg: '0002',
    Ducur: '0002',
    'El Tambo': '0002',
    'General Morales (Socarte)': '0002',
    Gualleturo: '0002',
    Guapan: '0002',
    'Honorato Vasquez (Tambo Viejo)': '0002',
    Ingapirca: '0002',
    'Javier Loyola (Chuquipata)': '0002',
    Jerusalen: '0002',
    Juncal: '0002',
    'La Troncal': '0002',
    'La Puntilla - El Triunfo': '0002',
    'Luis Cordero': '0002',
    'Manuel J. Calle': '0002',
    'Nazon (Cab. en Pampa de Dominguez)': '0002',
    'Pancho Negro': '0002',
    Pidilig: '0002',
    Rivera: '0002',
    'San Antonio': '0002',
    'San Francisco de Sageo': '0002',
    Solano: '0002',
    Suscal: '0002',
    Taday: '0002',
    Turupamba: '0002',
    Ventura: '0002',
    'Voluntad De Dios': '0002',
    Zhud: '0002',
  },
  Carchi: {
    Bolivar: '0003',
    Concepcion: '0003',
    'Chitan De Navarretes': '0003',
    'Cristobal Colon': '0003',
    Cuesaca: '0003',
    'El Angel': '0003',
    'El Carmelo (El Pun)': '0003',
    'El Chical': '0003',
    'El Goaltal': '0003',
    Espejo: '0003',
    'Fernando Salvador': '0003',
    'Garcia Moreno': '0003',
    Huaca: '0003',
    'Jijon y Caamaño (Cab. en Rio Blanco)': '0003',
    'Juan Montalvo (San Ignacio de Quil)': '0003',
    'Julio Andrade': '0003',
    'La Libertad (Alizo)': '0003',
    'La Paz': '0003',
    'Los Andes': '0003',
    'Mariscal Sucre': '0003',
    'Mira (Chontahuasi)': '0003',
    'Monte Olivo': '0003',
    Montufar: '0003',
    Piartal: '0003',
    Pioter: '0003',
    'San Pedro De Huaca': '0003',
    'San Gabriel': '0003',
    'San Isidro': '0003',
    'San Rafael': '0003',
    'San Vicente de Pusir': '0003',
    'Santa Martha de Cuba': '0003',
    'Tobar Donosco (La Boscana de Camumbi)': '0003',
    Tufiño: '0003',
    Tulcan: '0003',
    'Urbina (Taya)': '0003',
  },
  Chimborazo: {
    Alausi: '0004',
    Achupallas: '0004',
    'Bilbao (Cab. en Quiluyacu)': '0004',
    'Cacha (Cab. en Machangara)': '0004',
    Cajabamba: '0004',
    Calpi: '0004',
    Chambo: '0004',
    Cañi: '0004',
    Capzol: '0004',
    Cebadas: '0004',
    Chunchi: '0004',
    Columbe: '0004',
    Colta: '0004',
    Compud: '0004',
    Cumanda: '0004',
    Cubijes: '0004',
    'El Altar': '0004',
    'El Guano': '0004',
    Flores: '0004',
    Gonzol: '0004',
    Guamote: '0004',
    Guanando: '0004',
    Guasuntos: '0004',
    Huigra: '0004',
    Ilapo: '0004',
    'Juan de Velasco (Pangor)': '0004',
    'La Candelaria': '0004',
    'La Providencia': '0004',
    Lican: '0004',
    Licto: '0004',
    Llagos: '0004',
    Matus: '0004',
    Multitud: '0004',
    Pallatanga: '0004',
    Palmira: '0004',
    Penipe: '0004',
    'Pistishi (Nariz del Diablo)': '0004',
    Puela: '0004',
    Pumallacta: '0004',
    Pungala: '0004',
    Punin: '0004',
    Quimiag: '0004',
    Riobamba: '0004',
    'San Andres': '0004',
    'San Antonio de Bayushig': '0004',
    'San Gerardo de Pacalcaguan': '0004',
    'San Isidro de Patulu': '0004',
    'San Jose del Chazo': '0004',
    'San Juan': '0004',
    'San Luis': '0004',
    'Santa Fe de Galan': '0004',
    'Santiago de Quito': '0004',
    Sevilla: '0004',
    Sibambe: '0004',
    Tixan: '0004',
    Valparaiso: '0004',
    Yaruquies: '0004',
  },
  Cotopaxi: {
    '11 de Noviembre (Ilinchisi)': '0005',
    'Alaques (Alaquez)': '0005',
    Anchilivi: '0005',
    Angamarca: '0005',
    'Antonio Jose Holquin (Santa Lucia)': '0005',
    'Belisario Quevedo': '0005',
    Canchagua: '0005',
    Chipualo: '0005',
    Cusubamba: '0005',
    'El corazon': '0005',
    Guaytacama: '0005',
    Guangaje: '0005',
    'Guasaganda (Cab. en Guasaganda Centro)': '0005',
    Isinlivi: '0005',
    'Joseguango Bajo': '0005',
    'La Mana': '0005',
    'Las Pampas': '0005',
    'La Victoria': '0005',
    Lasso: '0005',
    Latacunga: '0005',
    Moraspungo: '0005',
    Mulalao: '0005',
    Mulalillo: '0005',
    'Palo Quemado': '0005',
    Pangua: '0005',
    Panzaleo: '0005',
    Pastocalle: '0005',
    Patain: '0005',
    Pilalo: '0005',
    Pinllopata: '0005',
    Poalo: '0005',
    Pucayacu: '0005',
    Pujili: '0005',
    'Ramon Campaña': '0005',
    Rumipamba: '0005',
    Salcedo: '0005',
    'San Marcos': '0005',
    'San Juan de Pastocalle': '0005',
    'Santa Ana': '0005',
    Saquisili: '0005',
    Sigchos: '0005',
    Tanicuchi: '0005',
    Tingo: '0005',
    Toacaso: '0005',
    Yanayacu: '0005',
    Zumbahua: '0005',
  },
  'El Oro': {
    '3 Cerritos': '0006',
    Abañin: '0006',
    Arcapamba: '0006',
    Arenillas: '0006',
    Atahualpa: '0006',
    Ayapamba: '0006',
    'Bajo Alto': '0006',
    Barbones: '0006',
    Balsas: '0006',
    Bellamaria: '0006',
    Bellavista: '0006',
    'Buena Vista': '0006',
    'Caña Quemada': '0006',
    'Capiro (Cab en La Capilla de Capiro)': '0006',
    Carcabon: '0006',
    Casacay: '0006',
    Chacras: '0006',
    Chilla: '0006',
    Cordoncillo: '0006',
    Curtincapa: '0006',
    'El Cambio': '0006',
    'El Guabo': '0006',
    'El Ingenio': '0006',
    'El Pache': '0006',
    'El Paraiso': '0006',
    'El Porton': '0006',
    'El Retiro': '0006',
    Guanazan: '0006',
    Guizhaguiña: '0006',
    Huaquillas: '0006',
    Huertas: '0006',
    Jambeli: '0006',
    'La Avanzada': '0006',
    'La Bocana': '0006',
    'La Iberia': '0006',
    'Las Lajas': '0006',
    'La Peaña': '0006',
    'La Victoria': '0006',
    'Loma De Franco': '0006',
    Lourdes: '0006',
    Machala: '0006',
    Malvas: '0006',
    Marcabeli: '0006',
    Morales: '0006',
    'Moromoro (Cab. en el Vado)': '0006',
    Muluncay: '0006',
    'Nuevo Puente Internacional Cebef': '0006',
    Paccha: '0006',
    Palmales: '0006',
    Pasaje: '0006',
    Piedras: '0006',
    Piñas: '0006',
    Portovelo: '0006',
    Progreso: '0006',
    'Puerto Bolivar': '0006',
    'Puerto Hualtaco': '0006',
    'Puerto Jeli': '0006',
    'Rio Bonito': '0006',
    Salatis: '0006',
    Salvias: '0006',
    'San Antonio': '0006',
    'San Isidro': '0006',
    'San Jose': '0006',
    'San Juan de Cerro Azul': '0006',
    'San Roque (Ambrosio Maldonado)': '0006',
    'San Vicente Del Jobo': '0006',
    'Santa Rosa': '0006',
    Saracay: '0006',
    Sinsao: '0006',
    Shumiral: '0006',
    'Tendales (Cab. en Puerto Tendales)': '0006',
    Torata: '0006',
    Uzhcurrumi: '0006',
    Victoria: '0006',
    Zaruma: '0006',
  },
  Esmeraldas: {
    '5 de Junio (Cab. en Uimbi)': '0007',
    'Alto Tambo (Cab. en Guandual': '0007',
    Anchayacu: '0007',
    'Ancon (Pichangal)(Cab. en Palma Real)': '0007',
    Atacames: '0007',
    'Atahualpa (Cab. en Camarones)': '0007',
    Borbon: '0007',
    Calderon: '0007',
    'Camarones (Cab. en San Vicente)': '0007',
    Carondelet: '0007',
    Chinca: '0007',
    Chontaduro: '0007',
    Chumunde: '0007',
    'Chura (Chancama)(Cab. en el Yerbero)': '0007',
    'Colon Eloy del Maria': '0007',
    Concepcion: '0007',
    'Crnel. Carlos Concha Torres (Cab. en Huele)': '0007',
    Cube: '0007',
    'Eloy Alfaro': '0007',
    Esmeraldas: '0007',
    Galera: '0007',
    'La Concordia': '0007',
    'La Independencia': '0007',
    'La Tola': '0007',
    'La Union (Quininde)': '0007',
    'La Y De Calderon': '0007',
    Lagarto: '0007',
    'Las Peñas ': '0007',
    'Luis Vargas Torres (Cab. en Playa de Oro)': '0007',
    Majua: '0007',
    Maldonado: '0007',
    Malimpia: '0007',
    'Mataje (Cab. en Santander)': '0007',
    'Montalvo (Cab. en Horqueta)': '0007',
    Muisne: '0007',
    'Pampanal de Bolivar': '0007',
    'Quingue (Olmedo Perdomo Franco)': '0007',
    Quininde: '0007',
    'Rio Verde': '0007',
    Salima: '0007',
    Same: '0007',
    'San Francisco': '0007',
    'San Francisco de Onzole': '0007',
    'San Gregorio': '0007',
    'San Javier de Cayapas (Cab. en San Javier)': '0007',
    'San Jose de Cayapas': '0007',
    'San Jose de Chamanga (Cab. en Chamanga)': '0007',
    'San Mateo': '0007',
    'Santa Rita': '0007',
    'Santo Domingo de Onzole': '0007',
    'Selva Alegre': '0007',
    Sua: '0007',
    Tabiazo: '0007',
    Tachina: '0007',
    Tambillo: '0007',
    Telembi: '0007',
    Timbire: '0007',
    Tonchigue: '0007',
    Tonsupa: '0007',
    'Tululbi (cab. en Ricaurte)': '0007',
    Urbina: '0007',
    'Valdez (Limones)': '0007',
    Viche: '0007',
    'Vuelta Larga': '0007',
    'San Lorenzo': '0007',
  },
  Galapagos: {
    Bellavista: '0008',
    'El Progreso': '0008',
    Isabela: '0008',
    'Isla Santa Maria (Floreana)(Cab. en Pto. Velasco Ibarra)': '0008',
    'Puerto Ayora': '0008',
    'Puerto Baquerizo Moreno': '0008',
    'Puerto Villamil': '0008',
    'San Cristobal': '0008',
    'Santa Rosa (Incluye La Isla Baltra)': '0008',
    'Santa Cruz': '0008',
    'Tomas de Berlanga (Santo Tomas)': '0008',
  },
  Guayas: {
    '3 Postes': '0009',
    'A. Baquerizo Moreno - Jujan': '0009',
    Balao: '0009',
    'Balao Chico': '0009',
    Balzar: '0009',
    'Base Taura': '0009',
    'Boca De Caña': '0009',
    Boliche: '0009',
    Bucay: '0009',
    Cerecita: '0009',
    Chiveria: '0009',
    Chobo: '0009',
    Chongon: '0009',
    'Cien Familia': '0009',
    Colimes: '0009',
    Coloradal: '0009',
    'Coronel Marcelino Maridueña (San Carlos)': '0009',
    Cumanda: '0009',
    Daule: '0009',
    'Data De Playas': '0009',
    Duran: '0009',
    'El Deseo': '0009',
    'El Empalme': '0009',
    'El Morro': '0009',
    'El Nato': '0009',
    'El Rosario': '0009',
    'El Salitre (Las Ramas)': '0009',
    'El Triunfo': '0009',
    'Eloy Alfaro - Duran': '0009',
    Engabao: '0009',
    'General Vernaza': '0009',
    'General Villamil (Playas)': '0009',
    Guayaquil: '0009',
    'Guayas (Pueblo Nuevo)': '0009',
    'Ingenio San Carlos': '0009',
    'Isidro Ayora': '0009',
    'Jesus Maria': '0009',
    Jujan: '0009',
    Junquillal: '0009',
    'Km 26 - Virgen De Fatima': '0009',
    'La Maravilla': '0009',
    'La Puntilla': '0009',
    'La T De Salitre': '0009',
    'La Toma': '0009',
    'La Victoria (Ñauza)': '0009',
    'Las Animas': '0009',
    'Las Mercedes (Naranjal)': '0009',
    Laurel: '0009',
    Limonal: '0009',
    'Lomas De Sargentillo': '0009',
    'Lorenzo De Garaicoa': '0009',
    'Los Lojas (Enrique Baquerizo Moreno)': '0009',
    'Los Tintos': '0009',
    'Manuel J Calle': '0009',
    'Marcelino Mariduena': '0009',
    'Mariscal Sucre (Huaques)': '0009',
    'Matilde Esther': '0009',
    'Narcisa de Jesus': '0009',
    'Nueva Union': '0009',
    Milagro: '0009',
    Naranjal: '0009',
    Naranjito: '0009',
    Nobol: '0009',
    Palestina: '0009',
    'Pedro Carbo': '0009',
    Petrillo: '0009',
    Playas: '0009',
    Posorja: '0009',
    Progreso: '0009',
    'Puente Lucia': '0009',
    'Puerto Del Engabao': '0009',
    'Puerto Inca': '0009',
    Puna: '0009',
    'Roberto Astudillo': '0009',
    Sabanilla: '0009',
    'Salitre - Urbina Jado': '0009',
    Samborondon: '0009',
    'San Antonio (Playas)': '0009',
    'San Carlos (Balao)': '0009',
    'San Isidro': '0009',
    'San Jacinto': '0009',
    'San Jacinto De Yaguachi': '0009',
    'Santa Lucia': '0009',
    'Santa Rita (Balao)': '0009',
    'Santa Rosa de Flandes': '0009',
    'Simon Bolivar': '0009',
    Tarifa: '0009',
    Taura: '0009',
    Tenguel: '0009',
    'Urbina Jado - Salitre': '0009',
    'Valle de La Virgen': '0009',
    'Velasco Ibarra (El Empalme)': '0009',
    'Villa Nueva': '0009',
    'Virgen De Fatima Km 26': '0009',
    Yaguachi: '0009',
    'Yaguachi Viejo (Cone)': '0009',
  },
  Imbabura: {
    '6 de Julio de Caellaje (Cab. en Cuellaje)': '0010',
    Aduana: '0010',
    Alpachaca: '0010',
    Ambuqui: '0010',
    'Andrade Marin': '0010',
    Angochagua: '0010',
    'Antonio Ante': '0010',
    Apuela: '0010',
    Atuntaqui: '0010',
    Cahuasqui: '0010',
    Caranqui: '0010',
    Carolina: '0010',
    Chaltura: '0010',
    Chorlavi: '0010',
    Chuga: '0010',
    Cotacachi: '0010',
    'Dr. Miguel Egas Cabezas (Peguche)': '0010',
    'El Olivo': '0010',
    'El Retorno': '0010',
    'Garcia Moreno (Llurimagua)': '0010',
    'Gonzalez Suarez': '0010',
    Ibarra: '0010',
    Imantag: '0010',
    'Imabya (San Luis de Cobuendo)': '0010',
    'La Esperanza': '0010',
    'La Merced de buenos Aires': '0010',
    Lita: '0010',
    'Mariano Acosta': '0010',
    Natabuela: '0010',
    Otavalo: '0010',
    'Pablo Arenas': '0010',
    Pataqui: '0010',
    Peñaherrera: '0010',
    Pimampiro: '0010',
    Pinsaqui: '0010',
    'Plaza Gutierrez': '0010',
    'Puerto Lago': '0010',
    Quiroga: '0010',
    'San Antonio': '0010',
    'San Antonio De Ibarra': '0010',
    'San Blas': '0010',
    'San Francisco de Natabuela': '0010',
    'San Francisco de Sigsipamba': '0010',
    'San Jose': '0010',
    'San Jose de Chaltura': '0010',
    'San Jose de Quichinche': '0010',
    'San Juan de Iluman': '0010',
    'San Luis (Imbabura)': '0010',
    'San Miguel de Ibarra': '0010',
    'San Miguel De Urcuqui': '0010',
    'San Pablo': '0010',
    'San Pablo Del Lago': '0010',
    'San Rafael': '0010',
    'San Roque': '0010',
    'Santo Domingo Imbabura': '0010',
    'Selva Alegre': '0010',
    Tumbabiro: '0010',
    Urcuqui: '0010',
    'vacas Galindo (El Churo)(Cab. en San Miguel Alto)': '0010',
    Yachai: '0010',
    Yaguarcocha: '0010',
  },
  Loja: {
    '12 de Diciembre (Cab. en Achiotes)': '0011',
    '27 de Abril (Cab. en La Naranja': '0011',
    Alamor: '0011',
    Amaluza: '0011',
    Amarillos: '0011',
    Bellavista: '0011',
    Bolaspamba: '0011',
    Buenavista: '0011',
    Calvas: '0011',
    Cangonama: '0011',
    Cariamanga: '0011',
    Casanga: '0011',
    Catacocha: '0011',
    'Catamayo (La Toma)': '0011',
    'Cazaderos (Cab. en Mangaurco)': '0011',
    Celica: '0011',
    'Changaimina (La Libertad)': '0011',
    Chaguarpamba: '0011',
    Chantaco: '0011',
    Chaquinal: '0011',
    Chuquiribamba: '0011',
    Ciano: '0011',
    Colaisaca: '0011',
    'Cruzpamba (Cab. en Carlos Bustamante': '0011',
    'El Airo': '0011',
    'El Arenal': '0011',
    'El Cisne': '0011',
    'El Igenio': '0011',
    'El Limo (Mariana de Jesus)': '0011',
    'El Lucero': '0011',
    'El Paraiso de Celen': '0011',
    'El Rosario': '0011',
    'El Tablon': '0011',
    Espindola: '0011',
    Fundochamba: '0011',
    Garzareal: '0011',
    Gonzanama: '0011',
    Guachanama: '0011',
    Gualel: '0011',
    Jimbilla: '0011',
    Jimbura: '0011',
    'La Tingue': '0011',
    'La Victoria': '0011',
    Larama: '0011',
    'Lauro Guerrero': '0011',
    Limones: '0011',
    Loja: '0011',
    Lluzhapa: '0011',
    Macara: '0011',
    Malacatos: '0011',
    Manu: '0011',
    Mercadillo: '0011',
    Nambacola: '0011',
    'Nueva Fatima': '0011',
    Olmedo: '0011',
    Orianga: '0011',
    Paletillas: '0011',
    Paltas: '0011',
    Pindal: '0011',
    Pozul: '0011',
    Purunuma: '0011',
    Puyango: '0011',
    Quilanga: '0011',
    Quinara: '0011',
    Sabanilla: '0011',
    'Sabiango (La Capilla)': '0011',
    Sacapalca: '0011',
    'San Antonio': '0011',
    'San Antonio de Las Aradas (Cab. en Las Aradas)': '0011',
    'San Antonio de Qumbe (Cume)': '0011',
    'San Lucas': '0011',
    'San Pablo de Tenta': '0011',
    'San Pedro de La Bendita': '0011',
    'San Pedro de Vilcabamba': '0011',
    'San Sebastian de Yuluc': '0011',
    Sanguillin: '0011',
    'Santa Rufina': '0011',
    'Santa Teresina': '0011',
    Santiago: '0011',
    Saraguro: '0011',
    Sozoranga: '0011',
    'Selva Alegre': '0011',
    Sumaypamba: '0011',
    Tacamoros: '0011',
    'Taquil (Miguel Riofrio)': '0011',
    'Tnte Maximiliano Rodriguez Loaiza': '0011',
    'Urdaneta (Paquishapa)': '0011',
    Utuana: '0011',
    Vicentino: '0011',
    Vilcabamba: '0011',
    Yamana: '0011',
    'Yangana (Arsenio Castillo)': '0011',
    Zambi: '0011',
    Zapotillo: '0011',
  },
  'Los Rios': {
    'Antonio Sotomayor (Cab. en Playas de Vinces)': '0012',
    Baba: '0012',
    Babahoyo: '0012',
    'Buena Fe': '0012',
    Caracol: '0012',
    Catarama: '0012',
    Echeandia: '0012',
    'Entrada De San Juan': '0012',
    'Febres Cordero (Las Juntas)(Cab. en Mata de Cacao)': '0012',
    Fumisa: '0012',
    Guare: '0012',
    Hidrolitoral: '0012',
    'Isla De Bejucal': '0012',
    'La 14 Via El Paraiso': '0012',
    'La Esperanza': '0012',
    'La Julia': '0012',
    'La Union': '0012',
    'La Union (Babahoyo)': '0012',
    'La Union (Valencia)': '0012',
    'Las Naves': '0012',
    'Los Angeles - Recinto': '0012',
    'Mata De Cacao': '0012',
    Mocache: '0012',
    Montalvo: '0012',
    'Nueva Union (Los Rios)': '0012',
    Palenque: '0012',
    Palmisa: '0012',
    'Patricia Pilar': '0012',
    Pimocha: '0012',
    'Pueblo Nuevo (Los Rios)': '0012',
    Puebloviejo: '0012',
    'Puerto Pechiche': '0012',
    Quevedo: '0012',
    Quinsaloma: '0012',
    Ricaurte: '0012',
    'San Camilo': '0012',
    'San Carlos': '0012',
    'San Jacinto de Buena Fe': '0012',
    'San Juan': '0012',
    'San Luis De Pambil': '0012',
    Urdaneta: '0012',
    Valencia: '0012',
    Ventanas: '0012',
    Vinces: '0012',
    Zapotal: '0012',
    Zulema: '0012',
  },
  Manabi: {
    '10 De Agosto': '0013',
    '24 De Mayo': '0013',
    'Alhajuela (Bajo Grande)': '0013',
    America: '0013',
    Arenales: '0013',
    'Arq. Sixto Duran Ballen': '0013',
    'Atahualpa Manabi': '0013',
    Ayacucho: '0013',
    Bachillero: '0013',
    'Bahia De Caraquez': '0013',
    Barraganete: '0013',
    Bellavista: '0013',
    Bolivar: '0013',
    Boyaca: '0013',
    Calceta: '0013',
    Calderon: '0013',
    'Campozano (La Palma de Pajan)': '0013',
    Canoa: '0013',
    Canuto: '0013',
    Cañitas: '0013',
    Cascol: '0013',
    Charapoto: '0013',
    Cheven: '0013',
    Chibunga: '0013',
    Chirijos: '0013',
    Chone: '0013',
    'Ciudad Alfaro': '0013',
    Coaque: '0013',
    Cojimies: '0013',
    Colon: '0013',
    Colorado: '0013',
    Convento: '0013',
    Crucita: '0013',
    'Don Juan': '0013',
    'El Anegado (Cab. en Eloy Alfaro)': '0013',
    'El Carmen': '0013',
    'El Matal': '0013',
    'El Rodeo': '0013',
    'Flavio Alfaro': '0013',
    Guale: '0013',
    'Honorato Vasquez (Cab. en Vasquez)': '0013',
    Jama: '0013',
    Jaramijo: '0013',
    Jipijapa: '0013',
    Junin: '0013',
    Julcuy: '0013',
    'La Chorrera': '0013',
    'La Estancilla': '0013',
    'La Pila': '0013',
    Lascano: '0013',
    'Leonidas Plaza': '0013',
    Lodana: '0013',
    'Los Bajos': '0013',
    Machalilla: '0013',
    Mache: '0013',
    Manta: '0013',
    Membrillal: '0013',
    Membrillo: '0013',
    Montecristi: '0013',
    Noboa: '0013',
    'Nuevo Briceño': '0013',
    Olmedo: '0013',
    Pajan: '0013',
    Pedernales: '0013',
    'Pedro Pablo Gomez': '0013',
    Pichincha: '0013',
    'Playa Prieta': '0013',
    Portoviejo: '0013',
    'Pueblo Nuevos': '0013',
    'Puerto de Cayo': '0013',
    'Puerto Lopez': '0013',
    Quiroga: '0013',
    Ricaurte: '0013',
    'Rio Chico': '0013',
    Rocafuerte: '0013',
    Salango: '0013',
    'San Antonio': '0013',
    'San Clemente': '0013',
    'San Francisco de Novillo (Cab. en Novillo)': '0013',
    'San Isidro': '0013',
    'San Jacinto': '0013',
    'San Pablo (Cab. en Pueblo Nuevo)': '0013',
    'San Pedro de Suma': '0013',
    'San Placido': '0013',
    'San Sebastian': '0013',
    'San Vicente': '0013',
    Sancan: '0013',
    'Santa Ana': '0013',
    'Santa Ana de Vuelta Larga': '0013',
    'Santa Marianita (Boca de Pacoche)': '0013',
    Sosote: '0013',
    Sucre: '0013',
    Tosagua: '0013',
    'Wilfrido Loor Moreira (Maicito)': '0013',
    Zapallo: '0013',
  },
  'Morona Santiago': {
    '16 de Agosto': '0014',
    'Alshi (Cab. en 9 de Octobre)': '0014',
    'Amazonas (Rosario de Cuyes)': '0014',
    Arapicos: '0014',
    Asuncion: '0014',
    Bermejos: '0014',
    Bomboiza: '0014',
    Chigñinda: '0014',
    Chiguaza: '0014',
    Chupianza: '0014',
    Copal: '0014',
    Cuchaentza: '0014',
    'Cumanda (Cab. en Colonia Agricola Sevilla del Oro)': '0014',
    'El Ideal': '0014',
    'El Rosario': '0014',
    'General Leonidas Plaza Gutierreza (limon)': '0014',
    'General Proaño': '0014',
    Gualaquiza: '0014',
    Huambi: '0014',
    Huamboya: '0014',
    'Huasaga (Cab. en Wampuik)': '0014',
    Indanza: '0014',
    'Limon - Indanza': '0014',
    Logroño: '0014',
    Macas: '0014',
    Macuma: '0014',
    Mendez: '0014',
    Morona: '0014',
    'Nueva Tarqui': '0014',
    'Pablo Sexto': '0014',
    'Pablo VI': '0014',
    Palora: '0014',
    'Palora (Metzera)': '0014',
    'Pan de Azucar': '0014',
    Patuca: '0014',
    Pumpuentsa: '0014',
    'Rio Blanco': '0014',
    'San Antonio (Cab. en San Antonio Centro)': '0014',
    'San Carlos de Limon': '0014',
    'San Francisco de Chinimbimi': '0014',
    'San Isisdro': '0014',
    'San Jacinto de Wakambeis': '0014',
    'San Jose de Morona': '0014',
    'San Juan Bosco': '0014',
    'San Luis de El Acho (Cab. en El Acho)': '0014',
    'San Miguel de Conchay': '0014',
    'San Miguel de Cuyes': '0014',
    'Sangay (Cab. en Nayamanaca)': '0014',
    'Santa Marianita de Jesus': '0014',
    'Santa Susana de Chiviaza (Cab. en Chiviaza)': '0014',
    Santiago: '0014',
    'Santiago de Pananza': '0014',
    'Sevilla Don Bosco': '0014',
    Shimpis: '0014',
    Sinai: '0014',
    Sucua: '0014',
    Taisha: '0014',
    Tayuza: '0014',
    Tiwintza: '0014',
    Tuutinentza: '0014',
    Yaupi: '0014',
    'Yunganza (Cab. en EL Rosario)': '0014',
    'Zuña (Zuñac)': '0014',
  },
  Napo: {
    Ahuano: '0015',
    'Arosemena Tola': '0015',
    Archidona: '0015',
    Baeza: '0015',
    Borja: '0015',
    'Carlos Julio Arosemena': '0015',
    'Carlos Julio Arosemena Tola': '0015',
    Chontapunta: '0015',
    Cosanga: '0015',
    Cotundo: '0015',
    'El Chaco': '0015',
    'Gonzalo Pizarro': '0015',
    'Gonzalez Diaz de Pineda (El Bombon)': '0015',
    Linares: '0015',
    'Nueva Esperanza': '0015',
    Oyacachi: '0015',
    Pano: '0015',
    Papallacta: '0015',
    'Puerto Misahualli': '0015',
    'Puerto Napo': '0015',
    Quijos: '0015',
    'San Pablo de Ushpayacu': '0015',
    Sardinas: '0015',
    Sumaco: '0015',
    Talag: '0015',
    Tazayacu: '0015',
    Tena: '0015',
  },
  Orellana: {
    'Alejandro Labaka': '0016',
    'Avila (Cab. en Huiruno)': '0016',
    Aguarico: '0016',
    'Captan Augusto Rivadeneyra': '0016',
    Cononaco: '0016',
    Dayuma: '0016',
    'El Coca - Francisco De Orellana': '0016',
    'El Dorado': '0016',
    'El Eden': '0016',
    Enocanqui: '0016',
    'Garcia Moreno': '0016',
    'Ines Arango (Cab. en Western)': '0016',
    'La Belleza': '0016',
    'La Joya De Los Sachas': '0016',
    'Lago San Pedro': '0016',
    Loreto: '0016',
    'Nuevo Paraiso (Cab. en Unión Chimborazo)': '0016',
    'Nuevo Rocafuerte': '0016',
    Orellana: '0016',
    Pompeya: '0016',
    'Puerto Murialdo': '0016',
    Rumipamba: '0016',
    'San Carlos': '0016',
    'San Jose de Dahuano': '0016',
    'San Jose de Guayusa': '0016',
    'San Jose de Payamino': '0016',
    'San Luis de Armenia': '0016',
    'San Sebastian del Coca': '0016',
    'San Vicente de Huaticocha': '0016',
    'Santa Maria de Huirima': '0016',
    'Taracoa (Cab. en Nueva Esperanza: Yuca)': '0016',
    Tiputini: '0016',
    'Tres de Noviembre': '0016',
    'Union Milagreña': '0016',
    Yasuni: '0016',
  },
  Pastaza: {
    Arajuno: '0017',
    Canelo: '0017',
    Curaray: '0017',
    'Diez de Agosto': '0017',
    Fatima: '0017',
    'Madre Tierra': '0017',
    Mera: '0017',
    'Montalvo (Andoas)': '0017',
    Pastaza: '0017',
    Pomona: '0017',
    Puyo: '0017',
    'Rio Corrientes': '0017',
    'Rio Tigre': '0017',
    'Santa Clara': '0017',
    'San Jose': '0017',
    Sarayacu: '0017',
    'Shell (El Puyo)': '0017',
    'Simon Bolivar': '0017',
    Tarqui: '0017',
    'Teninete Hugo Ortiz': '0017',
    'Veracruz (Indillama)(Cab. En Inidillama)': '0017',
  },
  Pichincha: {
    Alangasí: '0018',
    Aloag: '0018',
    Aloasi: '0018',
    Amaguaña: '0018',
    Ascazubi: '0018',
    'Atahualpa (Habaspamba)': '0018',
    Ayora: '0018',
    Calacali: '0018',
    'Calderon (Carapungo)': '0018',
    Cangahua: '0018',
    Chavezpamba: '0018',
    'Checa (Chilpa)': '0018',
    Cayambe: '0018',
    Conocoto: '0018',
    Cotogchoa: '0018',
    Cumbayá: '0018',
    Cutuglahua: '0018',
    'El Chaupi': '0018',
    'El Quinche': '0018',
    Guachala: '0018',
    Gualea: '0018',
    Guangopolo: '0018',
    Guayllabamba: '0018',
    'Juan Montalvo': '0018',
    'La Esperanza': '0018',
    'La Merced': '0018',
    'Llano Chico': '0018',
    Lloa: '0018',
    Machachi: '0018',
    Malchingui: '0018',
    'Manuel Cornejo Astorga (Tandapi)': '0018',
    Mejia: '0018',
    Mindo: '0018',
    Nanegal: '0018',
    Nanegalito: '0018',
    Nayo: '0018',
    Nono: '0018',
    'Mitad del Mundo': '0018',
    'Olmedo (Pesillo)': '0018',
    Oton: '0018',
    Pacto: '0018',
    'Pedro Moncayo': '0018',
    'Pedro Vicente Maldonado': '0018',
    Perucho: '0018',
    Pomasqui: '0018',
    Puellaro: '0018',
    'Puerto Quito': '0018',
    Pifo: '0018',
    Pintag: '0018',
    Puembo: '0018',
    Quito: '0018',
    Ruminahui: '0018',
    Rumipamba: '0018',
    'San Antonio': '0018',
    'San Jose de Minas': '0018',
    'San Miguel De Los Bancos': '0018',
    'Santa Rosa de Cuzubamba': '0018',
    Sangolqui: '0018',
    Tababela: '0018',
    Tabacundo: '0018',
    Tambillo: '0018',
    Tocachi: '0018',
    Tupigachi: '0018',
    Tumbaco: '0018',
    Uyumbicho: '0018',
    Yaruquí: '0018',
    Zambiza: '0018',
  },
  'Santa Elena': {
    Ancon: '0019',
    Anconcito: '0019',
    Ballenita: '0019',
    Cadeate: '0019',
    Capaes: '0019',
    Chanduy: '0019',
    Colonche: '0019',
    'El Tambo': '0019',
    'Jambeli Monteverde': '0019',
    'La Libertad': '0019',
    'Libertador Bolivar': '0019',
    Manglaralto: '0019',
    Montañita: '0019',
    'Monteverde - Jambeli': '0019',
    Muey: '0019',
    Olon: '0019',
    Palmar: '0019',
    Prosperidad: '0019',
    'Punta Barandua': '0019',
    'Punta Blanca': '0019',
    'Punta Carnero': '0019',
    'Punta Centinela': '0019',
    Salinas: '0019',
    'San Pablo': '0019',
    'San Pedro': '0019',
    'Santa Elena': '0019',
    'Santa Rosa': '0019',
    'Simon Bolivar (Julio Moreno)': '0019',
    Valdivia: '0019',
  },
  'Santo Domingo De Los Tsachilas': {
    Alluriquin: '0020',
    'El Esfuerzo': '0020',
    'Km 14-Quevedo': '0020',
    'Km 24-Quevedo': '0020',
    'Km 38.5 Via Quevedo': '0020',
    'Km 41 Via Quevedo': '0020',
    'Las Delicias': '0020',
    'Luz De America': '0020',
    'Nuevo Israel': '0020',
    'Puerto Limon': '0020',
    'San Jacinto Del Bua': '0020',
    'Santa Maria del Toachi': '0020',
    'Santo Domingo': '0020',
    'Santo Domingo de los Colorados': '0020',
    'Valle Hermoso': '0020',
  },
  Sucumbios: {
    '7 De Julio': '0021',
    'Aguas Negras': '0021',
    Cascales: '0021',
    Cuyabeno: '0021',
    Dureno: '0021',
    'El Dorado de Cascales': '0021',
    'El Eno': '0021',
    'El Payion de San Francisco': '0021',
    'General Farfan': '0021',
    'Gonzalo Pizarro': '0021',
    Jambeli: '0021',
    'Jivino Verde': '0021',
    'La Bonita': '0021',
    'La Sofia': '0021',
    'Lago Agrio': '0021',
    Limoncocha: '0021',
    'Los Rios': '0021',
    Lumbaqui: '0021',
    'Nueva Loja': '0021',
    Pacayacu: '0021',
    'Palma Roja': '0021',
    Pañacocha: '0021',
    'Puerto Bolivar (Puerto Montufar)': '0021',
    'Puerto El Carmen del Putumayo': '0021',
    'Puerto Libre': '0021',
    'Puerto Rodriguez': '0021',
    Putumayo: '0021',
    Reventador: '0021',
    'Rosa Florida': '0021',
    'San Pedro de los Cofanes': '0021',
    'San Roque (Cab. en San Vicente)': '0021',
    'Santa Barbara': '0021',
    'Santa Cecilia': '0021',
    'Santa Rosa de Sucumbios': '0021',
    Sevilla: '0021',
    Shushufindi: '0021',
    Sucumbios: '0021',
    Tarapoa: '0021',
  },
  Tungurahua: {
    Ambato: '0022',
    'Atahualpa (Chisalata)': '0022',
    'Augusto N. Martinez (Mundugleo)': '0022',
    'Banos De Agua Santa': '0022',
    'Baquerizo Moreno': '0022',
    'Betinez (Pachanlica)': '0022',
    Cevallos: '0022',
    'Chiquicha (Cab. en Chiquicha Grande)': '0022',
    'Constantino Fernandez (Cab. en Cullitahua)': '0022',
    Cotalo: '0022',
    Cunchibamba: '0022',
    'El Rosario (Rumichaca)': '0022',
    'Emilio Maria Teran (Rumipamba)': '0022',
    'Garcia Moreno (Chumaqui)': '0022',
    'Huachi Grande': '0022',
    Huambalo: '0022',
    Izamba: '0022',
    'Juan Benigno Vela': '0022',
    Lligua: '0022',
    'Los Andes (Cab. en Poatug)': '0022',
    'Marcos Espinel (Chacata)': '0022',
    Mocha: '0022',
    Pasa: '0022',
    Patate: '0022',
    Pelileo: '0022',
    Picaigua: '0022',
    'Pilagñin (Pilahñin)': '0022',
    Pillaro: '0022',
    Pinguili: '0022',
    'Presidente Urbina (Chagrapamba-Patzucul)': '0022',
    Quero: '0022',
    Quinchicoto: '0022',
    'Quisapincha (Quizapincha)': '0022',
    'Rio Negro': '0022',
    'Rio Verde': '0022',
    Rumipamba: '0022',
    Salasaca: '0022',
    'San Andres': '0022',
    'San Bartolome de Pinllog': '0022',
    'San Fernando (Pasa San Fernando)': '0022',
    'San Jose de Paolo': '0022',
    'San Miguelito': '0022',
    'San Pedro De Pelileo': '0022',
    'Santa Rosa (Ambato)': '0022',
    'Santiago De Pillaro': '0022',
    'Sucre (Cab. en Sucre-Patate Urcu)': '0022',
    Tisaleo: '0022',
    Totoras: '0022',
    Ulba: '0022',
    Unamuncho: '0022',
    'Yanayacu - Mochapata (Cab. en Yanayacu)': '0022',
  },
  'Zamora Chinchipe': {
    '28 de Mayo (San Jose de Yacuambi)': '0023',
    Bellavista: '0023',
    Chicaña: '0023',
    'Centinela Del Condor': '0023',
    Chito: '0023',
    Chinchipe: '0023',
    Cumbaratza: '0023',
    'El Chorro': '0023',
    'El Guisme': '0023',
    'El Pangui': '0023',
    'El Porvenir del Carmen': '0023',
    Guadalupe: '0023',
    Guayzimi: '0023',
    'Imbana (La Victoria de Imbana)': '0023',
    'La Canela': '0023',
    'La Chonta': '0023',
    'La Paz': '0023',
    'Los Encuentros': '0023',
    Nagaritza: '0023',
    'Nuevo Paraiso': '0023',
    'Nuevo Quito': '0023',
    Pachicutza: '0023',
    Palanda: '0023',
    Paquisha: '0023',
    Pucapamba: '0023',
    Sabanilla: '0023',
    'San Andres': '0023',
    'San Carlos de las Minas': '0023',
    'San Francisco del Vergel': '0023',
    Timbara: '0023',
    Tundayme: '0023',
    Tutupali: '0023',
    Valladolid: '0023',
    Yacuambi: '0023',
    Yantzaza: '0023',
    'Yanrzaza (Yanzatza)': '0023',
    Zamora: '0023',
    Zumba: '0023',
    Zumbi: '0023',
    Zurmi: '0023',
  },
}

export default {
  country: 'ECU',
  abbr: 'EC',
  postalCodeFrom: ONE_LEVEL,
  postalCodeLevels: ['state'],
  firstLevelPostalCodes: firstLevelPostalCodes(countryData),
  fields: [
    {
      hidden: true,
      name: 'country',
      maxLength: 100,
      label: 'country',
      size: 'medium',
    },
    {
      autoComplete: 'nope',
      hidden: true,
      label: 'postalCode',
      maxLength: 50,
      name: 'postalCode',
      postalCodeAPI: false,
      regex: /^([\d]{4})$/,
      size: 'small',
    },
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'number',
      maxLength: 750,
      label: 'number',
      required: true,
      size: 'mini',
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'complement',
      size: 'large',
    },
    {
      hidden: true,
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
    },
    {
      name: 'state',
      maxLength: 100,
      label: 'province',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'city',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
    {
      hidden: true,
      name: 'neighborhood',
      maxLength: 100,
      label: 'neighborhood',
      size: 'large',
    },
    {
      name: 'receiverName',
      elementName: 'receiver',
      maxLength: 750,
      label: 'receiverName',
      size: 'xlarge',
      required: true,
    },
  ],
  geolocation: {
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
      required: false,
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: true,
      notApplicable: true,
    },

    street: { valueIn: 'long_name', types: ['route'] },

    neighborhood: {
      valueIn: 'long_name',
      types: [
        'neighborhood',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
        'sublocality_level_5',
      ],
    },

    state: {
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [
      { name: 'street' },
      { delimiter: ' ', name: 'number' },
      { delimiter: ' ', name: 'complement' },
    ],
    [{ name: 'neighborhood' }],
    [
      { name: 'postalCode' },
      { delimiter: ' ', name: 'city' },
      { delimiter: ', ', name: 'state' },
    ],
  ],
}
