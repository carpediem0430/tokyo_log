import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, Users, Plane, Building2, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
const TripHeader: React.FC = () => {
  const tripInfo = {
    destination: "도쿄, 일본",
    dates: "2025년 12월 20일(토) - 22일(월)",
    duration: "2박 3일",
    travelers: "5명 (가족 여행)",
    flight: {
      outbound: {
        flightNumber: "WE501",
        route: "ICN T1 → NRT T2",
        date: "12월 20일(토)",
        departure: "09:40",
        arrival: "12:05",
        boardingTime: "08:40",
        reservationNumber: "H7AACF"
      },
      inbound: {
        flightNumber: "WE504",
        route: "NRT T2 → ICN T1",
        date: "12월 22일(월)",
        departure: "15:20",
        arrival: "18:35",
        boardingTime: "14:20",
        reservationNumber: "H7AACF"
      },
      totalCost: "860,500원",
      seats: "5석"
    },
    accommodation: {
      name: "칸데오 호텔 도쿄 신바시",
      nameEn: "CANDEO HOTELS Tokyo Shimbashi",
      address: "3 Chome-6-8 Shinbashi, Minato City, Tokyo 105-0004 일본",
      phone: "+81 3-5510-3400",
      checkIn: "12월 20일 15:00",
      checkOut: "12월 22일 11:00",
      reservationNumber: "1663507870",
      rooms: "3 X 더블룸 (금연) 시티뷰, 더블베드 1개",
      guests: "총 성인 5명",
      totalCost: "1,575,984원 (결제 완료)"
    }
  };
  return <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Main Trip Info */}
      <Card className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-6 w-6 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">{tripInfo.destination}</h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-lg text-gray-700">
            <div className="flex items-center gap-1">
              <Calendar className="h-5 w-5 text-red-500" />
              <span>{tripInfo.dates}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5 text-red-500" />
              <span>{tripInfo.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-5 w-5 text-red-500" />
              <span>{tripInfo.travelers}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Flight and Accommodation Info */}
      <div className="grid gap-4 md:gap-6">
        {/* Flight Information */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">항공편 정보</h3>
              </div>
              <div className="text-sm text-gray-600">
                예약번호: {tripInfo.flight.outbound.reservationNumber} | {tripInfo.flight.seats} | {tripInfo.flight.totalCost}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Outbound Flight */}
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-900">출국 항공편</h4>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{tripInfo.flight.outbound.flightNumber}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">경로</p>
                  <p className="font-medium text-gray-900">{tripInfo.flight.outbound.route}</p>
                  <p className="text-sm text-gray-600">{tripInfo.flight.outbound.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">출발 → 도착</p>
                  <p className="font-medium text-blue-600">{tripInfo.flight.outbound.departure} → {tripInfo.flight.outbound.arrival}</p>
                  <p className="text-xs text-gray-500">보딩: 09:10</p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs text-gray-500 mb-1">비행시간</p>
                  <p className="font-medium text-gray-900">2시간 25분</p>
                </div>
              </div>
            </div>
            
            {/* Inbound Flight */}
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-900">귀국 항공편</h4>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">{tripInfo.flight.inbound.flightNumber}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">경로</p>
                  <p className="font-medium text-gray-900">{tripInfo.flight.inbound.route}</p>
                  <p className="text-sm text-gray-600">{tripInfo.flight.inbound.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">출발 → 도착</p>
                  <p className="font-medium text-orange-600">{tripInfo.flight.inbound.departure} → {tripInfo.flight.inbound.arrival}</p>
                  <p className="text-xs text-gray-500">보딩: 14:50</p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs text-gray-500 mb-1">비행시간</p>
                  <p className="font-medium text-gray-900">2시간 15분</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accommodation Information */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">숙소 정보</h3>
              </div>
              <div className="text-sm text-gray-600">
                예약번호: {tripInfo.accommodation.reservationNumber}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/70 rounded-lg p-4 border border-green-100">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{tripInfo.accommodation.name}</h4>
                  <p className="text-sm text-gray-600">{tripInfo.accommodation.nameEn}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">주소</p>
                    <p className="text-sm text-gray-700 flex items-start gap-1">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {tripInfo.accommodation.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">전화번호</p>
                    <p className="text-sm text-gray-700">{tripInfo.accommodation.phone}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-green-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">체크인 - 체크아웃</p>
                    <p className="font-medium text-green-700">{tripInfo.accommodation.checkIn}</p>
                    <p className="font-medium text-green-700">{tripInfo.accommodation.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">객실 정보</p>
                    <p className="text-sm text-gray-700">{tripInfo.accommodation.rooms}</p>
                    <p className="text-sm text-gray-700">{tripInfo.accommodation.guests}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-xs text-gray-500 mb-1">총 금액</p>
                    <p className="font-semibold text-green-700">{tripInfo.accommodation.totalCost}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default TripHeader;