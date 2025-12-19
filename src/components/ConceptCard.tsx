import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, Clock, Users, Star } from "lucide-react";

interface ConceptData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  places: Array<{
    name: string;
    time: string;
    duration: string;
    description: string;
    rating: number;
  }>;
  totalDuration: string;
  difficulty: string;
  bestFor: string[];
}

const conceptsData: ConceptData[] = [
  {
    id: 'traditional',
    title: '전통문화 체험',
    description: '일본의 깊은 역사와 전통을 온 가족이 함께 체험해보세요',
    icon: '🏯',
    color: 'text-red-700',
    bgGradient: 'from-red-50 to-orange-50',
    places: [
      {
        name: '센소지 절',
        time: '09:00',
        duration: '2시간',
        description: '도쿄에서 가장 오래된 절, 전통 건축과 문화 체험',
        rating: 4.8
      },
      {
        name: '나카미세도리 거리',
        time: '11:00',
        duration: '1시간 30분',
        description: '전통 기념품과 간식을 즐길 수 있는 400년 된 상점가',
        rating: 4.6
      },
      {
        name: '우에노 공원',
        time: '14:00',
        duration: '2시간',
        description: '박물관과 동물원이 있는 문화의 중심지',
        rating: 4.7
      },
      {
        name: '도쿄국립박물관',
        time: '16:00',
        duration: '1시간 30분',
        description: '일본 전통 예술품과 역사 유물 관람',
        rating: 4.5
      }
    ],
    totalDuration: '7시간',
    difficulty: '쉬움',
    bestFor: ['역사 애호가', '문화 체험', '교육적 여행']
  },
  {
    id: 'shopping-food',
    title: '쇼핑 & 맛집 투어',
    description: '도쿄의 최신 트렌드와 미식을 만끽하는 특별한 하루',
    icon: '🛍️',
    color: 'text-pink-700',
    bgGradient: 'from-pink-50 to-purple-50',
    places: [
      {
        name: '시부야 스카이',
        time: '10:00',
        duration: '1시간 30분',
        description: '도쿄 전망과 쇼핑을 동시에 즐기는 복합공간',
        rating: 4.9
      },
      {
        name: '하라주쿠 다케시타도리',
        time: '12:00',
        duration: '2시간',
        description: '젊은 문화와 독특한 패션, 달콤한 간식의 거리',
        rating: 4.4
      },
      {
        name: '긴자 쇼핑 지구',
        time: '15:00',
        duration: '2시간 30분',
        description: '고급 브랜드와 백화점이 모인 쇼핑의 메카',
        rating: 4.6
      },
      {
        name: '츠키지 외시장',
        time: '18:00',
        duration: '1시간 30분',
        description: '신선한 해산물과 전통 일식을 맛보는 미식 천국',
        rating: 4.8
      }
    ],
    totalDuration: '7시간 30분',
    difficulty: '보통',
    bestFor: ['쇼핑 러버', '미식가', '트렌드 세터']
  },
  {
    id: 'family-friendly',
    title: '가족친화 어드벤처',
    description: '온 가족이 함께 즐길 수 있는 재미있고 안전한 액티비티',
    icon: '👨‍👩‍👧‍👦',
    color: 'text-blue-700',
    bgGradient: 'from-blue-50 to-cyan-50',
    places: [
      {
        name: '도쿄 디즈니랜드',
        time: '09:00',
        duration: '8시간',
        description: '마법 같은 하루를 선사하는 세계적인 테마파크',
        rating: 4.9
      },
      {
        name: '우에노 동물원',
        time: '10:00',
        duration: '3시간',
        description: '판다와 다양한 동물들을 만날 수 있는 역사 깊은 동물원',
        rating: 4.5
      },
      {
        name: '도쿄 스카이트리',
        time: '14:00',
        duration: '2시간',
        description: '634m 높이에서 바라보는 도쿄의 파노라마 뷰',
        rating: 4.7
      },
      {
        name: '아쿠아리움 품',
        time: '16:30',
        duration: '2시간',
        description: '오다이바의 현대적 수족관, 아이들에게 인기 만점',
        rating: 4.6
      }
    ],
    totalDuration: '하루 종일',
    difficulty: '쉬움',
    bestFor: ['어린이 동반', '가족 여행', '체험 활동']
  }
];

const ConceptCard: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = React.useState<string>('traditional');

  const selectedData = conceptsData.find(concept => concept.id === selectedConcept);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Concept Selection Tabs */}
      <div className="flex flex-col space-y-3">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          여행 컨셉 선택
        </h2>
        <div className="flex flex-col space-y-2">
          {conceptsData.map((concept) => (
            <Button
              key={concept.id}
              variant={selectedConcept === concept.id ? "default" : "outline"}
              className={cn(
                "w-full h-auto p-4 justify-start text-left transition-all duration-200",
                selectedConcept === concept.id 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                  : "hover:bg-gray-50 border-gray-200"
              )}
              onClick={() => setSelectedConcept(concept.id)}
            >
              <div className="flex items-center space-x-3 w-full">
                <span className="text-2xl">{concept.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-base">{concept.title}</div>
                  <div className={cn(
                    "text-sm mt-1",
                    selectedConcept === concept.id ? "text-blue-100" : "text-gray-600"
                  )}>
                    {concept.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Selected Concept Details */}
      {selectedData && (
        <Card className={cn(
          "w-full bg-gradient-to-br shadow-xl border-0",
          selectedData.bgGradient
        )}>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">{selectedData.icon}</span>
              <div>
                <h3 className={cn("text-2xl font-bold", selectedData.color)}>
                  {selectedData.title}
                </h3>
                <p className="text-gray-600 mt-1">{selectedData.description}</p>
              </div>
            </div>
            
            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center space-x-2 bg-white/70 px-3 py-2 rounded-full">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">{selectedData.totalDuration}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/70 px-3 py-2 rounded-full">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">{selectedData.difficulty}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Best For Tags */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">추천 대상</h4>
              <div className="flex flex-wrap gap-2">
                {selectedData.bestFor.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Places List */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                주요 방문지
              </h4>
              <div className="space-y-3">
                {selectedData.places.map((place, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-white/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{place.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-3">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{place.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{place.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{place.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                size="lg"
              >
                이 컨셉으로 여행 계획하기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConceptCard;