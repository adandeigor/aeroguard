'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wind, 
  Factory, 
  Car, 
  Sun, 
  Droplets, 
  Heart, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Home,
  Trees,
  Bike
} from 'lucide-react';

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Introduction */}
        <section className="mb-12">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-sky-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-6 flex-col md:flex-row">
                <div className="p-4 bg-sky-100 rounded-full">
                  <Wind className="h-12 w-12 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-sky-900 mb-3">What is Air Quality?</h2>
                  <p className="text-sky-700 text-lg leading-relaxed mb-4">
                    Air quality is like a report card for the air we breathe! Just like you get grades in school, 
                    the air gets a score too. This score tells us if the air is clean and safe to breathe, or if 
                    it has too much pollution.
                  </p>
                  <p className="text-sky-700 text-lg leading-relaxed">
                    Think of it like this: <strong>Clean air is like crystal clear water</strong> - you can't see 
                    anything bad in it. <strong>Polluted air is like muddy water</strong> - it has dirt and harmful 
                    things mixed in that can make you sick.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* AQI Explanation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sky-900 mb-6">Understanding the AQI Scale</h2>
          <p className="text-sky-700 text-lg mb-6">
            The <strong>Air Quality Index (AQI)</strong> is a number from 0 to 500. The lower the number, 
            the better the air quality! The EPA (Environmental Protection Agency) divides it into 6 levels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Good */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-900">0-50: Good</CardTitle>
                  <div className="text-4xl">😊</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <p className="text-green-800 font-bold">Excellent air quality</p>
                  </div>
                  <p className="text-green-700">
                    The air is clean and fresh. Perfect for playing outside, running, and having fun!
                  </p>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Who's affected:</strong> No one! Everyone can enjoy outdoor activities.
                    </p>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Example:</strong> Like breathing air in a forest or at the beach.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Moderate */}
            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-900">51-100: Moderate</CardTitle>
                  <div className="text-4xl">😐</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <p className="text-yellow-800 font-bold">Acceptable air quality</p>
                  </div>
                  <p className="text-yellow-700">
                    The air is okay for most people. If you have asthma or allergies, you might want to 
                    take it easy during long outdoor activities.
                  </p>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Who's affected:</strong> Very sensitive people should limit long outdoor efforts.
                    </p>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Example:</strong> Like being in a city with some cars and buses around.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Unhealthy for Sensitive Groups */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-orange-900 text-sm">101-150: Unhealthy for Sensitive Groups</CardTitle>
                  <div className="text-4xl">😷</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <p className="text-orange-800 font-bold">Sensitive groups be careful!</p>
                  </div>
                  <p className="text-orange-700">
                    Children, elderly people, and those with asthma or heart problems should avoid 
                    outdoor activities.
                  </p>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Who's affected:</strong> Kids, elderly, people with asthma or heart disease.
                    </p>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Example:</strong> Like a hazy day with visible smog in the air.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Unhealthy */}
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-red-900">151-200: Unhealthy</CardTitle>
                  <div className="text-4xl">😨</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <p className="text-red-800 font-bold">Everyone affected!</p>
                  </div>
                  <p className="text-red-700">
                    Everyone should reduce outdoor activities. The air can make you cough and feel 
                    uncomfortable. Stay inside if you can!
                  </p>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Who's affected:</strong> Everyone, especially sensitive groups.
                    </p>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Example:</strong> Like being near a big fire or in very heavy traffic.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Very Unhealthy */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-900">201-300: Very Unhealthy</CardTitle>
                  <div className="text-4xl">🚨</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                    <p className="text-purple-800 font-bold">Health alert!</p>
                  </div>
                  <p className="text-purple-700">
                    This is a health warning! Everyone should avoid all outdoor activities. 
                    The air is very dangerous to breathe.
                  </p>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Who's affected:</strong> Everyone will experience health effects.
                    </p>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>What to do:</strong> Stay indoors, close windows, use air purifiers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hazardous */}
            <Card className="bg-gradient-to-br from-rose-100 to-pink-100 border-2 border-rose-400 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-rose-900">301+: Hazardous</CardTitle>
                  <div className="text-4xl">☠️</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-600"></div>
                    <p className="text-rose-800 font-bold">Emergency!</p>
                  </div>
                  <p className="text-rose-700">
                    This is an emergency! The air is extremely dangerous. Everyone must stay inside 
                    with windows and doors closed. This is very rare but very serious!
                  </p>
                  <div className="bg-rose-100 p-3 rounded-lg">
                    <p className="text-sm text-rose-800">
                      <strong>Who's affected:</strong> Everyone is at serious risk of health problems.
                    </p>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-sm text-rose-800">
                      <strong>What to do:</strong> Emergency measures - evacuate if possible!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pollutants Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sky-900 mb-6">Meet the Pollutants</h2>
          <p className="text-sky-700 text-lg mb-8">
            Air pollution is made up of tiny particles and gases that can harm our health. Let's learn about 
            the main ones!
          </p>

          <Tabs defaultValue="pm25" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-sky-100">
              <TabsTrigger value="pm25" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                PM2.5
              </TabsTrigger>
              <TabsTrigger value="no2" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                NO₂
              </TabsTrigger>
              <TabsTrigger value="o3" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                O₃
              </TabsTrigger>
              <TabsTrigger value="so2" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                SO₂
              </TabsTrigger>
            </TabsList>

            {/* PM2.5 */}
            <TabsContent value="pm25">
              <Card className="bg-white/90 border-2 border-sky-200">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Droplets className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-sky-900">PM2.5 - Tiny Dust Particles</CardTitle>
                      <p className="text-sky-600">Particulate Matter 2.5 micrometers</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">What is it?</h4>
                    <p className="text-sky-700 text-lg">
                      PM2.5 are super tiny particles in the air - so small you need a microscope to see them! 
                      They're <strong>30 times smaller than a strand of your hair</strong>.
                    </p>
                  </div>

                  <div className="bg-sky-50 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-sky-900 mb-3">🔬 Size Comparison:</h4>
                    <ul className="space-y-2 text-sky-700">
                      <li>• <strong>Beach sand grain:</strong> 1,000 micrometers</li>
                      <li>• <strong>Human hair:</strong> 70 micrometers</li>
                      <li>• <strong>PM2.5 particle:</strong> 2.5 micrometers (tiny!)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">Where does it come from?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <Car className="h-6 w-6 text-orange-600 mb-2" />
                        <p className="font-semibold text-orange-900">Cars & Trucks</p>
                        <p className="text-sm text-orange-700">Exhaust from vehicles</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <Factory className="h-6 w-6 text-red-600 mb-2" />
                        <p className="font-semibold text-red-900">Factories</p>
                        <p className="text-sm text-red-700">Smoke from industries</p>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <Sun className="h-6 w-6 text-amber-600 mb-2" />
                        <p className="font-semibold text-amber-900">Fires</p>
                        <p className="text-sm text-amber-700">Smoke from burning</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">Why is it harmful?</h4>
                    <p className="text-sky-700 text-lg">
                      Because PM2.5 particles are so tiny, they can go deep into your lungs when you breathe. 
                      Imagine breathing in invisible dust - it can make it harder to breathe and make you cough.
                    </p>
                  </div>

                  <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-red-900 mb-2">⚠️ Health Effects:</h4>
                    <ul className="space-y-1 text-red-800">
                      <li>• Coughing and throat irritation</li>
                      <li>• Difficulty breathing</li>
                      <li>• Asthma attacks</li>
                      <li>• Lung problems over time</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NO2 */}
            <TabsContent value="no2">
              <Card className="bg-white/90 border-2 border-sky-200">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Car className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-sky-900">NO₂ - Nitrogen Dioxide</CardTitle>
                      <p className="text-sky-600">The gas from vehicles and power plants</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">What is it?</h4>
                    <p className="text-sky-700 text-lg">
                      NO₂ is an invisible gas that comes mostly from cars, trucks, and buses. It's what makes 
                      the air look brown or hazy on busy roads!
                    </p>
                  </div>

                  <div className="bg-sky-50 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-sky-900 mb-3">🚗 Fun Fact:</h4>
                    <p className="text-sky-700 text-lg">
                      When you see brown or orange haze over a city, that's often NO₂! It's like a dirty 
                      cloud that hangs in the air.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">Where does it come from?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <Car className="h-6 w-6 text-orange-600 mb-2" />
                        <p className="font-semibold text-orange-900">Vehicle Exhaust</p>
                        <p className="text-sm text-orange-700">Cars, trucks, buses burning fuel</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <Factory className="h-6 w-6 text-red-600 mb-2" />
                        <p className="font-semibold text-red-900">Power Plants</p>
                        <p className="text-sm text-red-700">Electricity generation</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">Why is it harmful?</h4>
                    <p className="text-sky-700 text-lg">
                      NO₂ irritates your airways (the tubes that bring air to your lungs). It's like breathing 
                      in something spicy - it can make your throat and lungs feel uncomfortable.
                    </p>
                  </div>

                  <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-red-900 mb-2">⚠️ Health Effects:</h4>
                    <ul className="space-y-1 text-red-800">
                      <li>• Irritated airways and coughing</li>
                      <li>• Worsens asthma symptoms</li>
                      <li>• Makes you more likely to get sick</li>
                      <li>• Can cause breathing problems</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* O3 */}
            <TabsContent value="o3">
              <Card className="bg-white/90 border-2 border-sky-200">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Sun className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-sky-900">O₃ - Ozone (Ground-level)</CardTitle>
                      <p className="text-sky-600">The "bad" ozone created by sunlight</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">What is it?</h4>
                    <p className="text-sky-700 text-lg">
                      Ozone is a special gas. High up in the sky, it protects us from the sun (that's good!). 
                      But down here where we breathe, it's harmful. It's created when sunlight "cooks" pollution 
                      from cars and factories.
                    </p>
                  </div>

                  <div className="bg-sky-50 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-sky-900 mb-3">☀️ Think of it like this:</h4>
                    <p className="text-sky-700 text-lg">
                      Imagine leaving milk in the hot sun - it goes bad, right? The same thing happens with 
                      pollution in sunlight - it creates ozone, which is bad for us to breathe!
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">When is it worst?</h4>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-yellow-900 font-semibold mb-2">🌞 Hot, sunny days!</p>
                      <p className="text-yellow-800">
                        Ozone levels are highest in the afternoon on hot, sunny days. That's when the sun 
                        has had time to "cook" the pollution.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">Why is it harmful?</h4>
                    <p className="text-sky-700 text-lg">
                      Ozone is like a chemical that irritates your lungs. It's similar to getting chlorine 
                      in your eyes at a swimming pool - but this happens in your lungs when you breathe!
                    </p>
                  </div>

                  <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-red-900 mb-2">⚠️ Health Effects:</h4>
                    <ul className="space-y-1 text-red-800">
                      <li>• Chest pain and coughing</li>
                      <li>• Shortness of breath</li>
                      <li>• Throat irritation</li>
                      <li>• Worsens lung diseases</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SO2 */}
            <TabsContent value="so2">
              <Card className="bg-white/90 border-2 border-sky-200">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <Factory className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-sky-900">SO₂ - Sulfur Dioxide</CardTitle>
                      <p className="text-sky-600">The smelly gas from burning fuel</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">What is it?</h4>
                    <p className="text-sky-700 text-lg">
                      SO₂ is a gas that smells like rotten eggs! It comes from burning coal and oil, especially 
                      in power plants and big factories.
                    </p>
                  </div>

                  <div className="bg-sky-50 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-sky-900 mb-3">👃 Fun (but gross) Fact:</h4>
                    <p className="text-sky-700 text-lg">
                      If you've ever smelled rotten eggs, that's what SO₂ smells like! The smell is nature's 
                      way of warning us it's dangerous.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">Where does it come from?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <Factory className="h-6 w-6 text-red-600 mb-2" />
                        <p className="font-semibold text-red-900">Power Plants</p>
                        <p className="text-sm text-red-700">Burning coal for electricity</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <Factory className="h-6 w-6 text-orange-600 mb-2" />
                        <p className="font-semibold text-orange-900">Industrial Facilities</p>
                        <p className="text-sm text-orange-700">Metal processing, oil refineries</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-sky-900 mb-2">Why is it harmful?</h4>
                    <p className="text-sky-700 text-lg">
                      SO₂ irritates your nose, throat, and lungs. It's especially bad for people with asthma 
                      because it can make their airways tighten up, making it hard to breathe.
                    </p>
                  </div>

                  <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-red-900 mb-2">⚠️ Health Effects:</h4>
                    <ul className="space-y-1 text-red-800">
                      <li>• Breathing difficulties</li>
                      <li>• Throat and nose irritation</li>
                      <li>• Triggers asthma attacks</li>
                      <li>• Can cause lung infections</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Protection Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sky-900 mb-6">How to Protect Yourself</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  When Air Quality is Good
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Trees className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-green-900">Play Outside!</p>
                    <p className="text-green-700 text-sm">Run, bike, and enjoy outdoor activities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bike className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-green-900">Exercise Freely</p>
                    <p className="text-green-700 text-sm">Perfect time for sports and physical activities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sun className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-green-900">Open Windows</p>
                    <p className="text-green-700 text-sm">Let fresh air into your home</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  When Air Quality is Bad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Home className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-red-900">Stay Indoors</p>
                    <p className="text-red-700 text-sm">Keep windows and doors closed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-red-900">Limit Physical Activity</p>
                    <p className="text-red-700 text-sm">Avoid running and intense exercise outside</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-red-900">Use Air Purifiers</p>
                    <p className="text-red-700 text-sm">If available, use indoor air filters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mb-12">
          <Card className="bg-gradient-to-br from-sky-100 to-blue-100 border-2 border-sky-300">
            <CardHeader>
              <CardTitle className="text-2xl text-sky-900">💡 Quick Tips for Kids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/80 p-4 rounded-lg">
                  <p className="font-bold text-sky-900 mb-2">1. Check Before You Play</p>
                  <p className="text-sky-700">Always check the AQI before going outside to play!</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <p className="font-bold text-sky-900 mb-2">2. Listen to Your Body</p>
                  <p className="text-sky-700">If you feel coughing or breathing hard, go inside!</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <p className="font-bold text-sky-900 mb-2">3. Plant Trees</p>
                  <p className="text-sky-700">Trees clean the air! Help plant trees in your community.</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <p className="font-bold text-sky-900 mb-2">4. Use Less Cars</p>
                  <p className="text-sky-700">Walk or bike when possible - it's good for you and the air!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
