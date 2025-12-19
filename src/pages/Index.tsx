import TripHeader from '@/components/TripHeader';
import WeatherCard from '@/components/WeatherCard';
import ItineraryPlan from '@/components/ItineraryPlan';
import TripMap from '@/components/TripMap'; // TripMap 컴포넌트 임포트

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 pb-12">
      {/* 1. 여행 기본 정보 (항공/숙소) */}
      <TripHeader />
      
      <div className="container mx-auto px-4 space-y-8">
        {/* 2. 도쿄 명소 지도: 시각적으로 동선을 먼저 파악 */}
        <TripMap />
        
        {/* 3. 여행 기간 날씨 정보 */}
        <WeatherCard />
        
        {/* 4. 일자별 상세 여행 일정 */}
        <ItineraryPlan />
      </div>
    </div>
  );
};

export default Index;