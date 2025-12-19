import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Train, Plane, Car, Clock, MapPin, DollarSign } from "lucide-react";

interface TransportOption {
  type: 'plane' | 'train' | 'car';
  title: string;
  duration: string;
  cost: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

const TransportInfo: React.FC = () => {
  const transportOptions: TransportOption[] = [
    {
      type: 'plane',
      title: '항공편',
      duration: '약 2시간',
      cost: '15만원~30만원',
      description: '가장 빠르고 편리한 이동 수단',
      details: [
        '인천국제공항 → 나리타/하네다 공항',
        '대한항공, 아시아나항공, JAL, ANA 등',
        '하네다공항이 도심 접근성 더 좋음',
        '사전 체크인으로 시간 단축 가능'
      ],
      icon: <Plane className="w-6 h-6" />
    },
    {
      type: 'train',
      title: '기차 + 페리',
      duration: '약 20시간',
      cost: '10만원~20만원',
      description: '경제적이고 특별한 경험',
      details: [
        'KTX → 부산역 → 부산항',
        '부산-하카타 페리 (3시간 30분)',
        '하카타 → 도쿄 신칸센 (5시간)',
        '일본 레일패스 활용 가능'
      ],
      icon: <Train className="w-6 h-6" />
    },
    {
      type: 'car',
      title: '자동차 + 페리',
      duration: '약 24시간',
      cost: '차량 포함 40만원~',
      description: '자유로운 일정과 짐 운반',
      details: [
        '서울 → 부산 고속도로 (4시간)',
        '부산-시모노세키 페리 (12시간)',
        '시모노세키 → 도쿄 고속도로 (8시간)',
        '일본 운전면허증 필요'
      ],
      icon: <Car className="w-6 h-6" />
    }
  ];

  const getTransportColor = (type: string) => {
    switch (type) {
      case 'plane':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'train':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'car':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'plane':
        return 'text-blue-600';
      case 'train':
        return 'text-green-600';
      case 'car':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">도쿄 교통 안내</h2>
        <p className="text-gray-600">출발지별 최적의 교통수단을 선택하세요</p>
      </div>

      <div className="grid gap-6">
        {transportOptions.map((option, index) => (
          <Card 
            key={index} 
            className={cn(
              "transition-all duration-300 hover:shadow-lg border-2",
              getTransportColor(option.type)
            )}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn("p-2 rounded-full bg-white", getIconColor(option.type))}>
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{option.title}</h3>
                    <p className="text-sm opacity-80">{option.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    <span>{option.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm font-medium mt-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{option.cost}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>상세 경로</span>
                </h4>
                <ul className="space-y-2">
                  {option.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-3 border-t border-current border-opacity-20">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full bg-white hover:bg-opacity-80 border-current"
                  >
                    예약 사이트 바로가기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-3">여행 팁</h3>
          <div className="grid gap-3 text-sm text-red-700">
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>성수기(12월)에는 항공료가 평소보다 높을 수 있으니 미리 예약하세요</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>5인 가족의 경우 짐이 많다면 항공편이 가장 편리합니다</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>일본 입국 시 여권 유효기간이 6개월 이상 남아있어야 합니다</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportInfo;