import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Map as MapIcon, Search, Maximize2 } from "lucide-react";
import tokyoMapImage from "../map.png"; 

const TripMap: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <Card className="border-orange-200 overflow-hidden shadow-md transition-all hover:shadow-lg">
        <CardHeader className="bg-orange-50/50 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapIcon className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">도쿄 주요 명소 지도</h3>
            </div>
            {/* <div className="text-xs text-orange-600 font-medium flex items-center gap-1">
              <Maximize2 className="h-3 w-3" />
              <span>지도를 클릭하여 상세 위치를 확인하세요</span>
            </div> */}
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-white">
          <div className="relative group overflow-hidden flex justify-center items-center bg-gray-50">
            {/* 실제 업로드하신 도쿄지도 이미지가 표시됩니다 */}
            <img 
              src={tokyoMapImage} 
              alt="도쿄 여행 지도" 
              className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
          {/* <div className="p-4 bg-white border-t border-orange-100">
            <p className="text-sm text-gray-700 leading-relaxed">
              📍 **숙소 위치:** 신바시 역 인근 **칸데오 호텔 도쿄 신바시**를 기점으로 동서남북 주요 관광 동선을 한눈에 확인할 수 있습니다.
            </p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default TripMap;