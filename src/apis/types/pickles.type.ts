export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface SortByOptions {
  option: '전체' | '인기순' | '가격 높은 순' | '가격 낮은 순';
}

export interface When {
  times: Date[];
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  finishDate: {
    year: number;
    month: number;
    day: number;
  };
  selectedDays: number[];
  startTime: {
    hour: number;
    minute: number;
  };
  finishTime: {
    hour: number;
    minute: number;
  };
}

export type CreatePickleData = {
  title: string;
  capacity: number;
  deadLine: Date;
  place: string;
  address: string;
  detailedAddress: string;
  areaCode: number;
  cost: number;
  goals: string[];
  imgUrl: string;
  when: When;
  category: string;
  explanation: string;
  latitude: number;
  longitude: number;
};

interface Participant {
  isLeader: boolean;
  user: string;
  _id: string;
}

export interface WholePickle {
  capacity: number;
  cost: number;
  deadLine: string;
  id: string;
  latitude: number;
  longtitude: number;
  participants: Participant[];
  title: string;
  when: When;
  where: string;
}

export interface DetailPickle {
  capacity: number;
  category: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
  deadLine: string;
  explanation: string;
  goals: string[];
  imgUrl: string;
  isCancelled: boolean;
  latitude: number;
  longtitude: number;
  leader: string;
  like: number;
  place: string;
  participantNumber: number;
  title: string;
  viewCount: number;
  when: When;
  where: string;
  id: string;
}

export interface CreateReviewData {
  stars: number;
  content?: string;
}

export interface ReviewData {
  pickleId: string;
  pickleTitle: string;
  pickleImageUrl: string;
  stars: number;
  content: string;
  date: Date;
}
