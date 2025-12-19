import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Thermometer, Droplets, Wind } from "lucide-react";

interface WeatherDay {
  date: string;
  day: string;
  condition: string;
  icon: React.ReactNode;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

const WeatherCard: React.FC = () => {
  const weatherData: WeatherDay[] = [
    {
      date: "12월 20일",
      day: "토요일",
      condition: "점차 흐려짐",
      icon: <Cloud className="w-8 h-8 text-gray-500" />,
      high: 16,
      low: 12,
      humidity: 25,
      windSpeed: 9,
      precipitation: 25
    },
    {
      date: "12월 21일",
      day: "일요일",
      condition: "때때로 비",
      icon: <CloudRain className="w-8 h-8 text-blue-500" />,
      high: 18,
      low: 9,
      humidity: 95,
      windSpeed: 20,
      precipitation: 95
    },
    {
      date: "12월 22일",
      day: "월요일",
      condition: "대체로 맑음",
      icon: <Sun className="w-8 h-8 text-blue-600" />,
      high: 12,
      low: 3,
      humidity: 91,
      windSpeed: 26,
      precipitation: 91
    }
  ];

  return (
    <Card className="w-full max-w-sm md:max-w-lg lg:max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Thermometer className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">도쿄 날씨</h2>
        </div>
        <p className="text-gray-600 text-sm">12월 20일 - 22일 일기예보</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {weatherData.map((day, index) => (
          <div 
            key={index}
            className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">{day.date}</h3>
                <p className="text-gray-600 text-sm">{day.day}</p>
              </div>
              
              <div className="flex items-center gap-3">
                {day.icon}
                <div className="text-right">
                  <p className="text-sm text-gray-600">{day.condition}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-red-500">{day.high}°</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-lg text-blue-500">{day.low}°</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <div className="text-xs">
                  <p className="text-gray-500">습도</p>
                  <p className="font-medium text-gray-700">{day.humidity}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-gray-400" />
                <div className="text-xs">
                  <p className="text-gray-500">바람</p>
                  <p className="font-medium text-gray-700">{day.windSpeed}km/h</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-blue-400" />
                <div className="text-xs">
                  <p className="text-gray-500">강수확률</p>
                  <p className="font-medium text-gray-700">{day.precipitation}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-amber-800 mb-1">여행 팁</h4>
              <p className="text-sm text-amber-700">
                12월의 도쿄는 서울과 비슷하지만 다소 더 따뜻합니다. 따뜻한 옷과 보습 크림을 챙기세요.
                실내는 난방이 잘 되어 있으므로, 쉽게 벗고 입을 수 있는 옷차림을 추천합니다.
                또한 여행 기간 중 비 예보가 있으니 우산이나 우비를 준비해 주세요.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;