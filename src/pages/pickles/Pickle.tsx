import styled from '@emotion/styled';

import BackButton from '@/components/common/button/BackButton';
import Category from '@/components/pickle-detail/Category';
import PickleTextInfo from '@/components/pickle-detail/PickleTextInfo';
import LikeCount from '@/components/pickle-detail/LikeCount';
import Button from '@/components/common/button/Button';
import ShareModal from '@/components/common/modal/ShareModal';
import { useGetPickelDetail } from '@/hooks/query/pickles';
import useAuth from '@/hooks/zustand/useAuth';
import routes from '@/constants/routes';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import Tag from '@/components/common/tag/Tag';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * 피클 상세 페이지
 */

export default function Pickle() {
  const navigate = useNavigate();
  const { pickleId = '' } = useParams();

  const { user } = useAuth();
  // 로그인 안 한 경우엔 user가 없을것임.

  const { data } = useGetPickelDetail(pickleId);
  const pickleDetailData = data?.data;
  const amILeader = user?._id && user._id === pickleDetailData?.leader;
  const amIMember = user?._id && pickleDetailData?.amIMember;
  const full = pickleDetailData?.capacity <= pickleDetailData?.participantNumber;
  // console.log(pickleDetailData.imgUrl)

  const { handleOpen } = useBottomSheetModal(state => state);

  return (
    <S.Container>
      <S.TopSection>
        <BackButton />
        <S.TopBox>
          <Category category={pickleDetailData?.category} />
          <button
            className="inquiry-btn"
            onClick={() => navigate(`${routes.chat}/${pickleId}/${pickleDetailData?.leader}`)}
          >
            1:1문의하기
          </button>
        </S.TopBox>

        <S.Information>
          <span className="applicant">{pickleDetailData?.participantNumber}명이 신청했어요!</span>
          <S.TitleAndLike>
            <h1 className="pickle-title">{pickleDetailData?.title}</h1>
            <LikeCount pickleId={pickleId} />
          </S.TitleAndLike>
          <S.Thumbnail src={pickleDetailData?.imgUrl} alt="피클 이미지" />
          <PickleTextInfo
            when={pickleDetailData?.when}
            place={pickleDetailData?.place}
            address={pickleDetailData?.address}
            detailedAddress={pickleDetailData?.detailedAddress}
            capacity={pickleDetailData?.capacity}
            cost={pickleDetailData?.cost}
          />
        </S.Information>
      </S.TopSection>

      <S.BottomSection>
        <S.DetailIntroduction>
          <h3>피클을 소개할게요!</h3>
          <p>{pickleDetailData?.explanation}</p>
        </S.DetailIntroduction>

        <S.GoalAndBtn>
          <h3>피클의 목표에요!</h3>
          <S.GoalContainer>
            {pickleDetailData?.goals.map((goal: string) => (
              <Tag key={goal} hasHandler={false}>
                {goal}
              </Tag>
            ))}
          </S.GoalContainer>
          {/* ToDo: 피클 신청하기 버튼 BottomNav없어지면 하단으로 내리기 */}
          <S.FloatingButton
            className="apply-btn"
            disabled={(!amILeader && amIMember) || full}
            onClick={() =>
              amILeader
                ? navigate('/pickle-edit/' + pickleId) //Todo 편집페이지로 변경필요
                : navigate('/pickle-join/' + pickleId, {
                    state: {
                      pickleId,
                      pickleTitle: pickleDetailData?.title,
                      pickleCost: pickleDetailData?.cost,
                    },
                  })
            }
          >
            {amILeader ? '피클 수정하기' : amIMember ? '신청됨' : full ? '마감됨' : '피클 신청하기'}
          </S.FloatingButton>
        </S.GoalAndBtn>
      </S.BottomSection>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    color: ${({ theme }) => theme.color.basic};

    h3 {
      margin-bottom: 1.2rem;
      ${({ theme }) => theme.typography.subTitle4}
    }
  `,

  TopSection: styled.div`
    padding: 9rem 3.4rem 2.7rem;
  `,

  TopBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 3.7rem 0 2.3rem;

    & .inquiry-btn {
      padding: 0.5rem 0.8rem;
      border-radius: 1.8rem;
      border: ${({ theme }) => theme.border};
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};

      &:hover {
        background-color: #f7f7f7; //임시
      }
    }
  `,

  Information: styled.div`
    & .applicant {
      color: ${({ theme }) => theme.color.primary};
      ${({ theme }) => theme.typography.body1};
    }
  `,

  TitleAndLike: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    margin: 0.6rem 0 1.4rem;

    & .pickle-title {
      ${({ theme }) => theme.typography.header};
    }
  `,

  Thumbnail: styled.img`
    width: 100%;
    height: 15rem;
    margin-bottom: 2rem;
    object-fit: cover;
    border-radius: 0.4rem;

    @media (min-width: 400px) {
      height: 20rem;
    }
    @media (min-width: 500px) {
      height: 40rem;
    }
  `,

  BottomSection: styled.div`
    ::before {
      display: block;
      height: 1.1rem;
      background-color: ${({ theme }) => theme.color.background};
      content: '';
    }
  `,

  DetailIntroduction: styled.div`
    padding: 2.6rem 3.4rem 2.7rem;
    border-bottom: ${({ theme }) => theme.border};

    p {
      min-height: 8rem;
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
    }
  `,

  GoalAndBtn: styled.div`
    padding: 2.6rem 3.4rem 13.6rem;
    margin-bottom: 5rem;

    & .apply-btn {
      margin-top: 5rem;
    }
  `,

  GoalContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  `,

  ShareButton: styled.button``,
  FloatingButton: styled(Button)`
    position: fixed;
    bottom: 10rem;
    left: 50%;
    max-width: 650px;
    transform: translateX(-50%);
    width: 80%;
  `,
};
