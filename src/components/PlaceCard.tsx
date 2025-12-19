import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Camera, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceCardProps {
  place?: {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    rating: number;
    duration: string;
    address: string;
    highlights: string[];
    price?: string;
    openHours?: string;
  };
}

const PlaceCard: React.FC<PlaceCardProps> = ({ 
  place = {
    id: "1",
    name: "센소지 절",
    category: "관광지",
    description: "도쿄에서 가장 오래된 불교 사원으로, 전통적인 일본 문화를 체험할 수 있는 대표적인 명소입니다. 나카미세도리 상점가에서 전통 간식과 기념품을 구매할 수 있습니다.",
    image: "/api/placeholder/400/250",
    rating: 4.5,
    duration: "2-3시간",
    address: "도쿄도 다이토구 아사쿠사 2-3-1",
    highlights: ["전통 건축", "나카미세도리", "오미쿠지 체험"],
    price: "무료",
    openHours: "06:00 - 17:00"
  }
}) => {
  const handleViewDetails = () => {
    console.log(`${place.name} 상세 정보 보기`);
  };

  const handleGetDirections = () => {
    console.log(`${place.name} 길찾기`);
  };

  return (
    <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto overflow-hidden hover:shadow-lg transition-all duration-300 border-red-100 hover:border-red-200">
      <div className="relative">
        <img 
          src={place.image} 
          alt={place.name}
          className="w-full h-48 md:h-56 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium text-white",
            place.category === "관광지" ? "bg-blue-500" : "bg-orange-500"
          )}>
            {place.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        {place.price && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
              {place.price}
            </span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">
            {place.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {place.rating}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{place.duration}</span>
          </div>
          {place.openHours && (
            <div className="flex items-center gap-1">
              <span className="text-xs">🕐</span>
              <span>{place.openHours}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {place.description}
        </p>

        <div className="flex items-start gap-1 mb-4">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-600 leading-relaxed">
            {place.address}
          </span>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">주요 특징</h4>
          <div className="flex flex-wrap gap-2">
            {place.highlights.map((highlight, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleViewDetails}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            상세보기
          </Button>
          <Button
            onClick={handleGetDirections}
            variant="outline"
            size="sm"
            className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
          >
            <MapPin className="h-4 w-4 mr-1" />
            길찾기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;