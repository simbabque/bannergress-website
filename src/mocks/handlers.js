import { http, HttpResponse, passthrough } from 'msw'

export const handlers = [
    http.get(/bnrs/, ({request}) => {
        const url = new URL(request.url)
        const minEventTimestamp = url.searchParams.get('minEventTimestamp')

        if (!minEventTimestamp) {
            return passthrough();
        }

        return HttpResponse.json([
                {
                    "id": "missionday-nürnberg-40c1",
                    "title": "MissionDay: Nürnberg",
                    "width": 6,
                    "numberOfMissions": 30,
                    "numberOfSubmittedMissions": 0,
                    "numberOfDisabledMissions": 0,
                    "startLatitude": 49.446999,
                    "startLongitude": 11.08132,
                    "startPlaceId": "nuremberg-4447",
                    "lengthMeters": 8727,
                    "formattedAddress": "Nuremberg, Germany",
                    "picture": "/bnrs/pictures/2104e045dafdef8399f8f8b76ec19f50",
                    "eventStartDate": "2024-01:01",
                    "eventstartTimestamp": "00:00:00",
                    "eventEndDate": "2024-12:31",
                    "eventendTimestamp": "23:59:59"
                },
                {
                    "id": "missionday-東北盛岡-0dec",
                    "title": "MissionDay 東北盛岡",
                    "width": 6,
                    "numberOfMissions": 12,
                    "numberOfSubmittedMissions": 0,
                    "numberOfDisabledMissions": 0,
                    "startLatitude": 39.709071,
                    "startLongitude": 141.154442,
                    "startPlaceId": "morioka-2ffc",
                    "lengthMeters": 20500,
                    "formattedAddress": "Morioka, Iwate, Japan",
                    "picture": "/bnrs/pictures/3594b9ec5777038c4e169d520f7c0119",
                    "eventStartDate": "2024-01:01",
                    "eventstartTimestamp": "00:00:00",
                    "eventEndDate": "2024-12:31",
                    "eventendTimestamp": "23:59:59"
                },
                {
                    "id": "missionday-hangzhou-20161203-2267",
                    "title": "MissionDay Hangzhou 20161203",
                    "width": 6,
                    "numberOfMissions": 24,
                    "numberOfSubmittedMissions": 0,
                    "numberOfDisabledMissions": 0,
                    "startLatitude": 30.277822,
                    "startLongitude": 120.158439,
                    "startPlaceId": "hangzhou-f6f8",
                    "lengthMeters": 29490,
                    "formattedAddress": "Hangzhou, Zhejiang, China",
                    "picture": "/bnrs/pictures/1c97207d45c7ac9d814b694a4d58c989",
                    "eventStartDate": "2024-01:01",
                    "eventstartTimestamp": "00:00:00",
                    "eventEndDate": "2024-12:31",
                    "eventendTimestamp": "23:59:59"
                },
                {
                    "id": "深圳印象-missionday纪念任务-8c87",
                    "title": "深圳印象·MissionDay纪念任务",
                    "width": 6,
                    "numberOfMissions": 6,
                    "numberOfSubmittedMissions": 0,
                    "numberOfDisabledMissions": 0,
                    "startLatitude": 22.540434,
                    "startLongitude": 113.934012,
                    "startPlaceId": "shenzhen-0db7",
                    "lengthMeters": 3008,
                    "formattedAddress": "Shenzhen, Guangdong Province, China",
                    "picture": "/bnrs/pictures/a74a4533116bb78e116831d9915b860e",
                    "eventStartDate": "2024-01:01",
                    "eventstartTimestamp": "00:00:00",
                    "eventEndDate": "2024-12:31",
                    "eventendTimestamp": "23:59:59"
                },
                {
                    "id": "mdsp-missionday-sapporo-2018-7-29-f570",
                    "title": "MDSP（MissionDay Sapporo） 2018.7.29",
                    "width": 6,
                    "numberOfMissions": 18,
                    "numberOfSubmittedMissions": 0,
                    "numberOfDisabledMissions": 0,
                    "startLatitude": 43.06775,
                    "startLongitude": 141.352179,
                    "startPlaceId": "sapporo-61f9",
                    "lengthMeters": 42356,
                    "formattedAddress": "Sapporo, Hokkaido, Japan",
                    "picture": "/bnrs/pictures/fbac665836db35dacefec78447376d3a",
                    "eventStartDate": "2024-01:01",
                    "eventstartTimestamp": "00:00:00",
                    "eventEndDate": "2024-12:31",
                    "eventendTimestamp": "23:59:59"
                }
            ])
    }),
]