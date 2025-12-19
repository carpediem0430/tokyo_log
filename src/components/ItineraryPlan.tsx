import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Plane, Train, Camera, Star, Heart, ShoppingBag, Luggage, CloudRain } from "lucide-react";

// 1. JSON 파일 임포트
import placeImagesData from "./google_maps_image_urls.json";

// 2. 새로운 JSON 구조에 맞춘 타입 정의 및 데이터 변환
interface PlaceData {
  link: string;
  images: string[];
}

// JSON 데이터를 강제로 타입 단언하여 사용 (키: 장소명, 값: { link, images[] })
const placeImages = placeImagesData as unknown as Record<string, PlaceData>;

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  location?: string;
  duration?: string;
  tips?: string[];
  googleMapLink?: string;
  detailedDescription?: string;
  imageUrls?: string[]; // 다중 이미지를 위한 배열로 변경
}

interface DayOption {
  id: string;
  title: string;
  description: string;
  concept: string;
  highlights: string[];
  timeline: TimelineItem[];
  pros: string[];
  difficulty: "쉬움" | "보통";
}

interface DayPlan {
  day: string;
  date: string;
  theme: string;
  options: DayOption[];
}

const ItineraryPlan: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("day1");
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({
    day1: "day1-option1",
    day2: "day2-option1",
    day3: "day3-option1"
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // 3. 데이터 매핑: placeImages[key].images 배열을 사용
  const dayPlans: DayPlan[] = [{
    day: "day1",
    date: "12월 20일 (토)",
    theme: "첫날 야경 투어",
    options: [
      {
        id: "day1-option1",
        title: "바다 야경",
        description: "오다이바 · 도요스",
        concept: "미래적 도시와 바다 야경",
        highlights: ["유리카모메", "레인보우 브릿지", "오다이바", "도요스 야경"],
        difficulty: "쉬움",
        pros: ["첫날부터 '와 도쿄다' 느낌", "야경 중심", "사진 포인트 많음"],
        timeline: [{
          time: "12:05",
          title: "나리타 공항 도착",
          description: "입국 수속 + 이동 고려 시 공항 출발 약 14:00~14:30",
          location: "나리타 국제공항",
          googleMapLink: placeImages["나리타 국제 공항"]?.link,
          detailedDescription: "입출국 수속",
          imageUrls: placeImages["나리타 국제 공항"]?.images
        }, {
          time: "13:00",
          title: "공항 내 식사",
          description: "라멘 / 덮밥 / 스시 중 선택",
          location: "나리타 공항 내 레스토랑",
          duration: "1시간",
          googleMapLink: placeImages["나리타 국제 공항"]?.link,
          imageUrls: placeImages["나리타 국제 공항"]?.images
        }, {
          time: "14:30",
          title: "공항 → 신바시 이동",
          description: "게이세이 나리타 스카이 액세스 → 오시아게 → 아사쿠사선 에어포트",
          location: "나리타 공항 → 신바시역",
          duration: "1시간 30분"
        }, {
          time: "16:00",
          title: "호텔 체크인 & 짐 보관",
          description: "Candeo Hotels Tokyo Shimbashi → 짐만 보관 후 외출",
          location: "신바시 호텔",
          googleMapLink: placeImages["칸데오 호텔 도쿄 신바시"]?.link,
          imageUrls: placeImages["칸데오 호텔 도쿄 신바시"]?.images
        }, {
          time: "16:30",
          title: "신바시 → 오다이바",
          description: "유리카모메 탑승 (야경 체감 최고) - 레인보우 브릿지 조망",
          location: "신바시 → 오다이바",
          duration: "30분",
          tips: ["유리카모메 우측 좌석 추천", "레인보우 브릿지 사진"],
          googleMapLink: placeImages["레인보우 브리지"]?.link,
          detailedDescription: "도쿄만을 잇는 대교로 밤에는 조명이 아름다움. 도보나 유리카모메로 접근 가능.",
          imageUrls: placeImages["레인보우 브리지"]?.images
        }, {
          time: "17:00",
          title: "오다이바 관광",
          description: "다이버시티, 덱스 도쿄 비치, 자유의 여신상",
          location: "오다이바",
          duration: "2시간",
          tips: ["바다 + 도쿄 야경 감상", "쇼핑몰 구경"],
          googleMapLink: placeImages["오다이바 지역"]?.link,
          detailedDescription: "인공섬 위의 복합관광지. 쇼핑몰·전망포인트·해변공원 등 볼거리가 풍성함.",
          imageUrls: placeImages["오다이바 지역"]?.images
        }, {
          time: "19:00",
          title: "2025 오다이바 레인보우 불꽃놀이",
          description: "겨울 밤하늘을 수놓는 화려한 불꽃놀이 (약 5분간)",
          location: "오다이바 해변공원 (자유의 여신상 앞 해상)",
          duration: "10분",
          tips: ["19:00 정각 시작", "무료 관람", "자유의 여신상 앞이 명당"],
          detailedDescription: "2025년 12월 매주 토요일 진행되는 특별 이벤트. 레인보우 브릿지를 배경으로 펼쳐지는 불꽃놀이를 감상할 수 있습니다.",
          googleMapLink: placeImages["자유의 여신상"]?.link,
          imageUrls: placeImages["자유의 여신상"]?.images
        }, {
          time: "19:15", // 시간 조정
          title: "도요스 이동",
          description: "도요스 주변 야경 감상",
          duration: "1시간"
        }, {
          time: "20:15", // 시간 조정
          title: "저녁 식사",
          description: "오다이바 몰 or 도요스 레스토랑",
          duration: "1시간"
        }, {
          time: "21:15", // 시간 조정
          title: "귀환",
          description: "유리카모메 → 신바시",
          duration: "30분"
        }]
      },{
      id: "day1-option2",
      title: "전통 + 도쿄 야경",
      description: "아사쿠사 · 스미다 · 스카이트리",
      concept: "전통문화와 현대 야경의 조화",
      highlights: ["센소지 절", "나카미세 거리", "스미다강 산책", "도쿄 스카이트리"],
      difficulty: "쉬움",
      pros: ["첫날에 무리 없음", "도쿄다운 전통 + 야경", "이동 동선 단순"],
      timeline: [{
        time: "12:05",
        title: "나리타 공항 도착",
        description: "입국 수속 + 이동 고려 시 공항 출발 약 14:00~14:30",
        location: "나리타 국제공항",
        googleMapLink: placeImages["나리타 국제 공항"]?.link,
        detailedDescription: "입출국 수속 및 공항 편의시설 이용",
        imageUrls: placeImages["나리타 국제 공항"]?.images
      }, {
        time: "13:00",
        title: "공항 내 식사",
        description: "라멘 / 덮밥 / 스시 중 선택",
        location: "나리타 공항 내 레스토랑",
        duration: "1시간",
        googleMapLink: placeImages["나리타 국제 공항"]?.link,
        imageUrls: placeImages["나리타 국제 공항"]?.images
      }, {
        time: "14:30",
        title: "공항 → 신바시 이동",
        description: "게이세이 나리타 스카이 액세스 → 오시아게 → 아사쿠사선 에어포트",
        location: "나리타 공항 → 신바시역",
        duration: "1시간 30분",
        tips: ["IC카드 미리 준비", "러시아워 피하기"]
      }, {
        time: "16:00",
        title: "호텔 체크인 & 짐 보관",
        description: "Candeo Hotels Tokyo Shimbashi → 짐만 보관 후 외출",
        location: "신바시 호텔",
        googleMapLink: placeImages["칸데오 호텔 도쿄 신바시"]?.link,
        detailedDescription: "스카이스파가 있는 거점 호텔",
        imageUrls: placeImages["칸데오 호텔 도쿄 신바시"]?.images
      }, {
        time: "16:30",
        title: "신바시 → 아사쿠사 이동",
        description: "지하철로 아사쿠사 센소지로 이동",
        duration: "30분"
      }, {
        time: "17:00",
        title: "센소지 & 나카미세 거리",
        description: "센소지, 나카미세 거리 산책 - 해질 무렵 분위기 매우 좋음",
        location: "아사쿠사 센소지",
        duration: "1시간 30분",
        tips: ["일몰 시간 확인", "길거리 간식 체험"],
        googleMapLink: placeImages["센소지 본당"]?.link,
        detailedDescription: "도쿄에서 가장 오래된 사찰. 가미나리문과 거대한 붉은 등불로 유명하며 주변 상점가가 발달해 있음.",
        imageUrls: placeImages["센소지 본당"]?.images
      }, {
        time: "18:30",
        title: "스미다강 산책",
        description: "아사쿠사 → 스카이트리 방향 강변 야경 + 도쿄 감성 산책",
        location: "스미다강변",
        duration: "1시간",
        tips: ["야경 사진 촬영 포인트", "따뜻한 음료 준비"],
        imageUrls: placeImages["도쿄 스카이트리"]?.images // 강변 뷰 대체
      }, {
        time: "19:30",
        title: "도쿄 스카이트리",
        description: "외관 감상 + 야경 (전망대는 선택 - 첫날은 외관만도 충분)",
        location: "도쿄 스카이트리",
        duration: "1시간",
        googleMapLink: placeImages["도쿄 스카이트리"]?.link,
        detailedDescription: "세계에서 가장 높은 타워 중 하나. 전망대에서 도쿄 전경 감상 가능하며 하단에는 쇼핑몰 소라마치가 있음.",
        imageUrls: placeImages["도쿄 스카이트리"]?.images
      }, {
        time: "20:30",
        title: "귀환",
        description: "스카이트리/오시아게 → 신바시",
        duration: "30분"
      }, {
        time: "21:00",
        title: "늦은 저녁",
        description: "신바시 이자카야 or 편의점 야식",
        location: "신바시 주변",
        googleMapLink: placeImages["칸데오 호텔 도쿄 신바시"]?.link,
        imageUrls: placeImages["칸데오 호텔 도쿄 신바시"]?.images
      }]
    }]
  }, {
    day: "day2",
    date: "12월 21일 (일)",
    theme: "도쿄 시내 탐방",
    options: [{
      id: "day2-option1",
      title: "츠키지 & 도쿄타워 루트",
      description: "시장 맛집 & 도쿄 상징",
      concept: "츠키지 시장 맛집과 도쿄타워 관광",
      highlights: ["시겐 참치덮밥", "츠키지 시장", "츠키지긴다코", "도쿄타워", "시바공원"],
      difficulty: "보통",
      pros: ["츠키지 시장 맛집 체험", "도쿄 대표 랜드마크", "다양한 먹거리와 관광"],
      timeline: [{
        time: "08:00",
        title: "숙소 → 츠키지 시장 이동",
        description: "신바시역 → (도에이 아사쿠사선) → 히가시긴자역 → 도보 5~7분",
        location: "신바시 → 츠키지 시장",
        duration: "15분",
        tips: ["아침 일찍 출발하는 게 가장 중요"]
      }, {
        time: "08:15",
        title: "시겐 참치덮밥 웨이팅",
        description: "오픈: 10:00, 09:00~09:30 도착해서 웨이팅 권장",
        location: "츠키지 시장 시겐",
        duration: "1시간 45분",
        tips: ["평균 대기: 30~60분 (주말이면 더 김)", "너무 길면 플랜 B로 인근 참치집 고려"],
        googleMapLink: placeImages["시겐 (Maguro)"]?.link,
        detailedDescription: "수목 휴무 / 신선한 참치 덮밥(Maguro)이 유명한 맛집",
        imageUrls: placeImages["시겐 (Maguro)"]?.images
      }, {
        time: "10:00",
        title: "츠키지 시장 관광",
        description: "시장 골목 구경, 디저트·길거리 음식, 츠키지긴다코 본점에서 타코야키",
        location: "츠키지 시장",
        duration: "1시간 30분 ~ 2시간",
        tips: ["12:00 전후 마무리하면 베스트"],
        googleMapLink: placeImages["츠키지 시장"]?.link,
        detailedDescription: "일본 최대 수산시장으로 유명. 신선한 초밥과 해산물 시식이 가능하며 오후 일찍 폐장함.",
        imageUrls: placeImages["츠키지 시장"]?.images
      }, {
        time: "12:00",
        title: "츠키지 → 도쿄타워 이동",
        description: "츠키지역 → (히비야선) → 카미야초역 → 도보 7~10분",
        location: "츠키지 → 도쿄타워",
        duration: "20~25분"
      }, {
        time: "12:30",
        title: "도쿄타워 관람 & 늦은 점심",
        description: "전망대 관람 + 내부 식당에서 늦은 점심",
        location: "도쿄타워",
        duration: "1시간 30분 ~ 2시간",
        tips: ["전망대까지 올라가면 체력 소모 있음", "이미 아침부터 움직여서 여기서 가장 피곤해질 수 있음"],
        googleMapLink: placeImages["도쿄 타워"]?.link,
        detailedDescription: "1958년 완공된 도쿄의 상징적인 랜드마크. 전망대에서 시내 전경 감상 가능.",
        imageUrls: placeImages["도쿄 타워"]?.images
      }, {
        time: "14:30",
        title: "도쿄타워 → 시바공원",
        description: "도보 이동, 가볍게 산책 + 사진",
        location: "시바공원",
        duration: "30분~40분",
        tips: ["휴식 겸 코스라서 일정 밸런스 좋음"],
        googleMapLink: placeImages["시바 공원"]?.link,
        detailedDescription: "도쿄타워가 가장 잘 보이는 뷰 포인트 공원. 산책하기 좋음.",
        imageUrls: placeImages["시바 공원"]?.images
      }, {
        time: "15:30",
        title: "선택 코스 (상황 따라)",
        description: "시바공원 계속 휴식 or 긴자 백화점 구경",
        location: "시바공원 or 긴자",
        duration: "2시간",
        tips: ["체력 상태에 따라 선택"]
      }, {
        time: "18:00",
        title: "긴자 이자카야 저녁 & 야경",
        description: "긴자 골목 이자카야 식사 후 긴자 야경 산책",
        location: "긴자",
        duration: "2시간",
        googleMapLink: placeImages["긴자 거리"]?.link,
        detailedDescription: "도쿄의 대표적 고급 쇼핑가로 명품 브랜드와 세련된 카페가 즐비. 주말엔 보행자천국으로 운영.",
        imageUrls: placeImages["긴자 거리"]?.images
      }, {
        time: "20:00",
        title: "돈키호테 쇼핑 → 숙소",
        description: "돈키호테 긴자점 쇼핑 후 도보 or 지하철로 숙소 복귀",
        location: "돈키호테 긴자 → 신바시",
        duration: "10~15분",
        googleMapLink: placeImages["돈키호테 긴자본관"]?.link,
        imageUrls: placeImages["돈키호테 긴자본관"]?.images
      }]
    }, {
      id: "day2-option2",
      title: "도쿄 야경 루트",
      description: "상징 & 일루미네이션",
      concept: "도쿄의 대표 랜드마크와 화려한 야경",
      highlights: ["오오토야 아침식사", "신주쿠 교엔", "도쿄타워", "롯폰기 미드타운"],
      difficulty: "보통",
      pros: ["도쿄 대표 명소 집중", "일루미네이션 명소", "인스타그램 포토존"],
      timeline: [{
        time: "06:30",
        title: "아침 식사 - 오오토야",
        description: "오오토야 신바시 1초메점 (신바시 1초메 14-3)",
        location: "신바시 1초메점",
        duration: "1시간",
        googleMapLink: placeImages["오오토야 신바시점"]?.link,
        detailedDescription: "일본 가정식 프랜차이즈. 깔끔하고 정갈한 아침 식사 가능.",
        imageUrls: placeImages["오오토야 신바시점"]?.images
      }, {
        time: "08:00",
        title: "신바시 → 신주쿠 이동",
        description: "지하철로 신주쿠역으로 이동",
        duration: "30분"
      }, {
        time: "08:30",
        title: "신주쿠 교엔",
        description: "넓고 정돈된 정원, 산책 & 사진 포인트 풍부",
        location: "신주쿠 교엔",
        duration: "1시간 30분 ~ 2시간",
        googleMapLink: placeImages["신주쿠 교엔"]?.link,
        detailedDescription: "넓은 정원과 온실이 있는 공원. 월요일 휴무.",
        imageUrls: placeImages["신주쿠 교엔"]?.images
      }, {
        time: "11:00",
        title: "점심 - 신주쿠 일대",
        description: "라멘 / 돈카츠 / 규동 중 선택",
        location: "신주쿠역 주변",
        duration: "1시간",
        imageUrls: placeImages["신주쿠 교엔"]?.images
      }, {
        time: "12:30",
        title: "신주쿠 → 도쿄타워 이동",
        description: "지하철로 카미야초역 이동",
        duration: "45분"
      }, {
        time: "13:30",
        title: "도쿄타워",
        description: "도쿄 대표 랜드마크 - 외부 야경 감상만으로도 충분",
        location: "도쿄타워",
        duration: "1시간 30분",
        tips: ["전망대 입장은 선택사항"],
        googleMapLink: placeImages["도쿄 타워"]?.link,
        detailedDescription: "1958년 완공된 도쿄의 상징. 붉은 철탑이 인상적임.",
        imageUrls: placeImages["도쿄 타워"]?.images
      }, {
        time: "15:30",
        title: "롯폰기 이동",
        description: "도보로 롯폰기 지역 이동",
        duration: "20분"
      }, {
        time: "16:00",
        title: "롯폰기 거리 탐방",
        description: "세련된 거리, 갤러리·카페 구경",
        location: "롯폰기",
        duration: "1시간 30분",
        googleMapLink: placeImages["롯폰기"]?.link,
        detailedDescription: "트렌디한 나이트라이프와 예술의 중심. 롯폰기 힐즈, 모리 미술관 등 복합 문화 공간이 밀집해 있음.",
        imageUrls: placeImages["롯폰기"]?.images
      }, {
        time: "17:30",
        title: "도쿄 미드타운",
        description: "쇼핑 & 산책, 계절별 일루미네이션 명소",
        location: "도쿄 미드타운",
        duration: "2시간",
        tips: ["일루미네이션 점등 시간 확인"],
        googleMapLink: placeImages["미드타운 가든"]?.link,
        detailedDescription: "도심 속 휴식 공간인 미드타운 가든과 쇼핑몰이 결합된 복합 시설.",
        imageUrls: placeImages["미드타운 가든"]?.images
      }, {
        time: "19:30",
        title: "저녁 - 츠지한 미드타운점",
        description: "카이센동(해산물 덮밥) 유명점 - 웨이팅 감안",
        location: "도쿄 미드타운",
        duration: "1시간",
        tips: ["조금 이른 시간 추천"],
        googleMapLink: placeImages["츠지한 미드타운점"]?.link,
        detailedDescription: "고급 카이센동(해산물 덮밥) 전문점. 미드타운 내 위치.",
        imageUrls: placeImages["츠지한 미드타운점"]?.images
      }, {
        time: "21:00",
        title: "신바시 가드 아래 이자카야 (옵션)",
        description: "현지 분위기 체험",
        location: "신바시",
        imageUrls: placeImages["칸데오 호텔 도쿄 신바시"]?.images
      }]
    }, {
      id: "day2-option3",
      title: "비 오는 날 대안",
      description: "실내 중심 일정",
      concept: "날씨에 상관없이 즐기는 실내 명소",
      highlights: ["오오토야 아침식사", "팀랩 보더리스", "롯폰기 미드타운", "실내 쇼핑"],
      difficulty: "쉬움",
      pros: ["날씨 걱정 없음", "실내 명소 집중", "편안한 일정"],
      timeline: [{
        time: "06:30",
        title: "아침 식사 - 오오토야",
        description: "오오토야 신바시 1초메점",
        location: "신바시 1초메점",
        duration: "1시간",
        googleMapLink: placeImages["오오토야 신바시점"]?.link,
        imageUrls: placeImages["오오토야 신바시점"]?.images
      }, {
        time: "09:00",
        title: "실내 대체 일정 (택1)",
        description: "① 팀랩 보더리스 ② 신주쿠 교엔 온실만 방문",
        location: "오다이바 or 신주쿠",
        duration: "3시간",
        tips: ["팀랩은 사전 예약 필수", "온실은 가벼운 옵션"],
        googleMapLink: placeImages["팀랩 보더리스"]?.link,
        detailedDescription: "팀랩 보더리스: 아자부다이 힐스에 위치. 빛과 미디어 아트로 구성된 몰입형 전시. 사전 예약 필수.",
        imageUrls: placeImages["팀랩 보더리스"]?.images
      }, {
        time: "13:00",
        title: "점심 & 이동",
        description: "실내 레스토랑에서 식사 후 롯폰기로 이동",
        duration: "1시간 30분"
      }, {
        time: "15:00",
        title: "롯폰기 미드타운 실내",
        description: "쇼핑몰 내부 + 일루미네이션 (실내에서 감상 가능)",
        location: "롯폰기 미드타운",
        duration: "3시간",
        tips: ["실내 연결통로 활용"],
        googleMapLink: placeImages["미드타운 가든"]?.link,
        imageUrls: placeImages["미드타운 가든"]?.images
      }, {
        time: "18:30",
        title: "저녁 식사",
        description: "미드타운 내 레스토랑",
        location: "롯폰기 미드타운",
        duration: "1시간",
        imageUrls: placeImages["미드타운 가든"]?.images
      }, {
        time: "20:00",
        title: "신바시 가드 아래 이자카야",
        description: "현지 분위기 체험으로 마무리",
        location: "신바시"
      }]
    }]
  }, {
    day: "day3",
    date: "12월 22일 (월)",
    theme: "출발일 & 공항 이동",
    options: [{
      id: "day3-option1",
      title: "여유로운 출발",
      description: "마지막 산책 + 기념품",
      concept: "여유있는 마지막 도쿄 체험",
      highlights: ["코메다커피", "히비야 공원", "긴자 쇼핑", "나리타 익스프레스"],
      difficulty: "쉬움",
      pros: ["여유있는 일정", "마지막 기념품 쇼핑", "안전한 공항 이동"],
      timeline: [{
        time: "07:00",
        title: "아침 - 코메다커피 신바시점",
        description: "호텔에서 도보 이동, 시로노와르 or 가츠산도 + 커피/모닝 세트",
        location: "코메다커피 신바시점",
        duration: "1시간",
        tips: ["호텔에서 도보 가능", "일본식 모닝 세트 체험"],
        googleMapLink: placeImages["코메다 커피 신바시점"]?.link,
        detailedDescription: "나고야 명물 카페. 아침 시간대 음료 주문 시 토스트 무료 제공 모닝 세트가 유명.",
        imageUrls: placeImages["코메다 커피 신바시점"]?.images
      }, {
        time: "08:00",
        title: "숙소 정리 & 체크아웃",
        description: "칸데오 신바시 호텔 체크아웃, 프론트에 짐 보관 요청 (대부분 무료)",
        location: "칸데오 호텔 신바시",
        duration: "1시간",
        tips: ["짐 보관 후 가벼운 외출 상태로 이동"],
        googleMapLink: placeImages["칸데오 호텔 도쿄 신바시"]?.link,
        imageUrls: placeImages["칸데오 호텔 도쿄 신바시"]?.images
      }, {
        time: "09:00",
        title: "히비야 공원 → 긴자 거리",
        description: "신바시 → 히비야공원 (도보 10~15분), 공원 산책 + 사진, 긴자 메인 스트리트 구경",
        location: "히비야 공원 → 긴자",
        duration: "2시간",
        tips: ["날씨 좋을 때 추천", "LOFT/MUJI/긴자 식료품 기념품 쇼핑"],
        googleMapLink: placeImages["히비야 공원"]?.link,
        detailedDescription: "도심 속 오아시스 같은 공원. 산책하기 좋으며 바로 옆이 긴자 거리임.",
        imageUrls: placeImages["히비야 공원"]?.images
      }, {
        time: "11:00",
        title: "점심 (가볍게)",
        description: "우동/소바/규동 추천 - 너무 무거운 메뉴 ❌ (비행 전)",
        location: "신바시 or 긴자",
        duration: "1시간",
        tips: ["신바시 소바집", "긴자 텐동", "규카츠 하프 사이즈"]
      }, {
        time: "12:00",
        title: "숙소로 복귀 & 짐 픽업",
        description: "화장실, 환복, 마지막 정리 - 이 시점부터 공항 이동 모드",
        location: "칸데오 호텔 신바시",
        duration: "30분"
      }, {
        time: "12:30",
        title: "공항 이동 시작",
        description: "나리타 익스프레스(N'EX) - 신바시 → 도쿄역 → 나리타 공항",
        location: "신바시역",
        duration: "1시간 20분",
        tips: ["신바시→도쿄역: JR 약 5분", "도쿄역→NRT: N'EX 약 60분", "환승 포함 총 75~85분"]
      }, {
        time: "13:50",
        title: "나리타 공항 도착",
        description: "체크인 & 수속, 마지막 면세 쇼핑, 간단한 식사 or 커피",
        location: "나리타 국제공항",
        duration: "1시간 30분",
        tips: ["국제선 권장 도착 시간 출발 2시간 전 충족"],
        googleMapLink: placeImages["나리타 국제 공항"]?.link,
        imageUrls: placeImages["나리타 국제 공항"]?.images
      }, {
        time: "15:20",
        title: "✈️ NRT 출발",
        description: "WE504편 나리타 → 인천",
        location: "나리타 공항"
      }, {
        time: "18:35",
        title: "🛬 ICN 도착",
        description: "인천국제공항 도착",
        location: "인천국제공항"
      }]
    }, {
      id: "day3-option2",
      title: "더라운지 & 카와토요",
      description: "공항 맛집 투어",
      concept: "공항에서 마지막 일본 맛 체험",
      highlights: ["코메다커피", "긴자 기념품", "더라운지", "카와토요 장어덮밥"],
      difficulty: "보통",
      pros: ["공항 맛집 체험", "무료 라운지 혜택", "마지막 일본 음식"],
      timeline: [{
        time: "07:00",
        title: "아침 - 코메다커피 신바시점",
        description: "호텔에서 도보 이동, 시로노와르 or 가츠산도 + 커피/모닝 세트",
        location: "코메다커피 신바시점",
        duration: "1시간",
        googleMapLink: placeImages["코메다 커피 신바시점"]?.link,
        imageUrls: placeImages["코메다 커피 신바시점"]?.images
      }, {
        time: "08:00",
        title: "숙소 정리 & 체크아웃",
        description: "칸데오 신바시 호텔 체크아웃, 짐 보관",
        location: "칸데오 호텔 신바시",
        duration: "1시간",
        googleMapLink: placeImages["칸데오 호텔 도쿄 신바시"]?.link,
        imageUrls: placeImages["칸데오 호텔 도쿄 신바시"]?.images
      }, {
        time: "09:00",
        title: "긴자 식료품 & 기념품 집중",
        description: "미쓰코시/마츠야 지하 식품관 - 말차, 과자, 사케 미니병 등",
        location: "긴자 백화점 지하",
        duration: "2시간",
        tips: ["공항보다 가격·종류 좋음"],
        googleMapLink: placeImages["긴자 거리"]?.link,
        imageUrls: placeImages["긴자 거리"]?.images
      }, {
        time: "11:00",
        title: "점심 (가볍게)",
        description: "우동/소바/규동 - 비행 전 가벼운 식사",
        location: "긴자",
        duration: "1시간"
      }, {
        time: "12:00",
        title: "숙소로 복귀 & 짐 픽업",
        description: "마지막 정리 후 공항 이동 준비",
        location: "칸데오 호텔 신바시",
        duration: "30분"
      }, {
        time: "12:30",
        title: "공항 이동",
        description: "나리타 익스프레스로 공항 이동",
        location: "신바시 → 나리타",
        duration: "1시간 20분"
      }, {
        time: "13:50",
        title: "더라운지 & 카와토요",
        description: "나리타 1터미널 더라운지 이동 → 카와토요 장어덮밥 2개 포장",
        location: "나리타 1터미널",
        duration: "30분",
        tips: ["무료 혜택이라면 적극 추천", "테이크아웃 먼저 요청하면 속도 빠름"],
        googleMapLink: placeImages["카와토요 나리타공항점"]?.link,
        detailedDescription: "나리타 공항 T1 4층에 위치. 장어덮밥 맛집.",
        imageUrls: placeImages["카와토요 나리타공항점"]?.images
      }, {
        time: "14:20",
        title: "1터미널 → 2터미널 이동",
        description: "터미널 간 무료 셔틀버스 (배차 간격: 5~10분, 이동시간: 10분)",
        location: "나리타 공항 내",
        duration: "15분",
        tips: ["짐 들고 이동해도 무리 없음", "보안검색 전 이동이라 문제 없음"]
      }, {
        time: "14:35",
        title: "2터미널 체크인 & 출국",
        description: "항공사 체크인/수하물 위탁, 출국 수속",
        location: "나리타 2터미널",
        duration: "10분"
      }, {
        time: "14:45",
        title: "출국 후 장어덮밥",
        description: "탑승구 이동 후 장어덮밥 식사 - 비행 전 먹기 딱 좋은 타이밍",
        location: "나리타 2터미널 출국장",
        duration: "25분",
        tips: ["냄새 걱정도 출국 후라 OK"]
      }, {
        time: "15:20",
        title: "✈️ NRT 출발",
        description: "WE504편 나리타 → 인천",
        location: "나리타 2터미널"
      }, {
        time: "18:35",
        title: "🛬 ICN 도착",
        description: "인천국제공항 도착",
        location: "인천국제공항"
      }]
    }, {
      id: "day3-option3",
      title: "피곤하면 간단히",
      description: "최소 일정",
      concept: "체력 보존 우선 일정",
      highlights: ["코메다커피", "호텔 휴식", "공항 이동"],
      difficulty: "쉬움",
      pros: ["체력 부담 최소", "여유로운 준비", "안전한 이동"],
      timeline: [{
        time: "07:00",
        title: "아침 - 코메다커피 신바시점",
        description: "호텔에서 도보 이동, 간단한 모닝 세트",
        location: "코메다커피 신바시점",
        duration: "1시간",
        googleMapLink: placeImages["코메다 커피 신바시점"]?.link,
        imageUrls: placeImages["코메다 커피 신바시점"]?.images
      }, {
        time: "08:00",
        title: "호텔에서 휴식",
        description: "체크아웃 전까지 호텔에서 여유롭게 휴식",
        location: "칸데오 호텔 신바시",
        duration: "3시간",
        googleMapLink: placeImages["칸데오 호텔 도쿄 신바시"]?.link,
        imageUrls: placeImages["칸데오 호텔 도쿄 신바시"]?.images
      }, {
        time: "11:00",
        title: "체크아웃 & 짐 정리",
        description: "늦은 체크아웃, 마지막 정리",
        location: "칸데오 호텔 신바시",
        duration: "30분"
      }, {
        time: "11:30",
        title: "간단한 점심",
        description: "호텔 근처에서 가벼운 식사",
        location: "신바시 주변",
        duration: "30분"
      }, {
        time: "12:00",
        title: "공항 이동",
        description: "나리타 익스프레스로 여유있게 이동",
        location: "신바시 → 나리타",
        duration: "1시간 30분"
      }, {
        time: "13:30",
        title: "나리타 공항",
        description: "체크인, 출국 수속, 면세점 쇼핑",
        location: "나리타 국제공항",
        duration: "1시간 50분",
        googleMapLink: placeImages["나리타 국제 공항"]?.link,
        imageUrls: placeImages["나리타 국제 공항"]?.images
      }, {
        time: "15:20",
        title: "✈️ NRT 출발",
        description: "WE504편 나리타 → 인천",
        location: "나리타 공항"
      }, {
        time: "18:35",
        title: "🛬 ICN 도착",
        description: "인천국제공항 도착",
        location: "인천국제공항"
      }]
    }]
  }];

  const toggleFavorite = (optionId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(optionId)) {
      newFavorites.delete(optionId);
    } else {
      newFavorites.add(optionId);
    }
    setFavorites(newFavorites);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움":
        return "text-green-600 bg-green-100";
      case "보통":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getThemeIcon = (day: string) => {
    switch (day) {
      case "day1":
        return <Camera className="w-5 h-5" />;
      case "day2":
        return <ShoppingBag className="w-5 h-5" />;
      case "day3":
        return <Luggage className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const selectedOption = selectedOptions[selectedDay];

  return <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          도쿄 여행 일정표
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          2025년 12월 20-22일 • 5인 가족 • 2박 3일
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            <span>WE501/504</span>
          </div>
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4" />
            <span>신바시 숙박</span>
          </div>
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            <span>야경 & 관광</span>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
          {dayPlans.map(plan => <TabsTrigger key={plan.day} value={plan.day} className="flex items-center gap-2">
              {getThemeIcon(plan.day)}
              <div className="text-left">
                <div className="font-medium text-xs">{plan.date}</div>
                <div className="text-xs text-gray-500">{plan.theme}</div>
              </div>
            </TabsTrigger>)}
        </TabsList>

        {dayPlans.map(dayPlan => <TabsContent key={dayPlan.day} value={dayPlan.day} className="space-y-6 mt-8">
            {/* Day Options */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 text-center">
                {dayPlan.date} 일정 옵션
              </h2>
              
              <div className="grid gap-6 w-full max-w-5xl mx-auto">
                {dayPlan.options.map(option => <Card key={option.id} className={cn("transition-all duration-200 hover:shadow-lg cursor-pointer", selectedOptions[dayPlan.day] === option.id ? "ring-2 ring-blue-500 ring-offset-2 bg-blue-50" : "hover:shadow-md")} onClick={() => setSelectedOptions(prev => ({
              ...prev,
              [dayPlan.day]: option.id
            }))}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                              {option.title}
                            </span>
                            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getDifficultyColor(option.difficulty))}>
                              {option.difficulty}
                            </span>
                            {option.id === "day2-option3" && <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                                <CloudRain className="w-3 h-3" />
                                우천 대비
                              </span>}
                            {option.id.includes("day3") && <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                                <Plane className="w-3 h-3" />
                                출발일
                              </span>}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {option.description}
                          </h3>
                          <p className="text-gray-600 mb-3">{option.concept}</p>
                          
                          
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button variant="ghost" size="sm" onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(option.id);
                    }} className="p-2">
                            <Heart className={cn("w-5 h-5", favorites.has(option.id) ? "text-red-500 fill-current" : "text-gray-400")} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Highlights */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            주요 하이라이트
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {option.highlights.map((highlight, idx) => <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                {highlight}
                              </span>)}
                          </div>
                        </div>

                        {/* Pros */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">✔️ 장점</h4>
                          <ul className="space-y-1">
                            {option.pros.map((pro, idx) => <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span>{pro}</span>
                              </li>)}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>

            {/* Detailed Timeline */}
            {selectedOptions[dayPlan.day] && <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    상세 일정표
                  </h2>
                  <p className="text-gray-600">
                    {dayPlan.options.find(opt => opt.id === selectedOptions[dayPlan.day])?.title} 코스
                  </p>
                </div>

                <Card className="max-w-4xl mx-auto">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {dayPlan.options.find(opt => opt.id === selectedOptions[dayPlan.day])?.timeline.map((item, index) => <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold text-sm">
                              {item.time}
                            </div>
                            {index < dayPlan.options.find(opt => opt.id === selectedOptions[dayPlan.day])!.timeline.length - 1 && <div className="w-0.5 h-8 bg-blue-200 mt-2"></div>}
                          </div>
                          
                          <div className="flex-1 pb-6 overflow-hidden">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                              {item.duration && <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.duration}
                                </span>}
                            </div>
                            
                            <p className="text-gray-600 mb-2">{item.description}</p>
                            
                            {/* 지도 링크 연결 */}
                            {item.location && <a href={item.googleMapLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline mb-2 transition-colors">
                                <MapPin className="w-3 h-3" />
                                <span>{item.location}</span>
                              </a>}
                            
                            {/* 4. 다중 이미지 렌더링 영역: 가로 스크롤 갤러리 */}
                            {item.imageUrls && item.imageUrls.length > 0 && (
                              <div className="flex gap-2 overflow-x-auto pb-2 mb-3 mt-1 scrollbar-hide">
                                {item.imageUrls.map((url, imgIdx) => (
                                  <img
                                    key={imgIdx}
                                    src={url}
                                    alt={`${item.title} - ${imgIdx + 1}`}
                                    className="w-32 h-20 object-cover rounded-md shadow-sm border border-gray-100 flex-shrink-0"
                                  />
                                ))}
                              </div>
                            )}
                            
                            {item.tips && <div className="mt-3">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                  <h4 className="text-sm font-medium text-yellow-800 mb-1">💡 팁</h4>
                                  <ul className="space-y-1">
                                    {item.tips.map((tip, tipIdx) => <li key={tipIdx} className="text-sm text-yellow-700">
                                        • {tip}
                                      </li>)}
                                  </ul>
                                </div>
                              </div>}

                            {/* 상세 설명 영역 */}
                            {item.detailedDescription && <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="font-semibold text-gray-700">📌 특징: </span>
                                {item.detailedDescription}
                              </div>}
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>}
          </TabsContent>)}
      </Tabs>
    </div>;
};

export default ItineraryPlan;