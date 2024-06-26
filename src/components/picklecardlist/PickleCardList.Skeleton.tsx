import styled from '@emotion/styled';

export default function SkeletonPickleCardList() {
  return (
    <S.SkeletonContainer>
      <S.SkeletonInner>
        <S.SkeletonCard />
        <S.SkeletonCard />
        <S.SkeletonCard />
        <S.SkeletonCard />
        <S.SkeletonCard />
      </S.SkeletonInner>
    </S.SkeletonContainer>
  );
}

const S = {
  SkeletonContainer: styled.div`
    overflow-x: hidden;
    margin-left: -2.5rem;
    margin-right: -2.5rem;
  `,
  SkeletonInner: styled.div`
    display: inline-flex;
    gap: 8px;
    flex-wrap: nowrap;
    overflow: auto;
    padding-left: 2.5rem;
  `,
  SkeletonCard: styled.div`
    width: 14.4rem;
    height: 16.3rem;
    border-radius: 0.4rem;
    position: relative;
    background: #f2f2f2;
    overflow: hidden;

    @keyframes skeleton-gradient {
      0% {
        background-color: rgba(165, 165, 165, 0.1);
      }
      50% {
        background-color: rgba(165, 165, 165, 0.3);
      }
      100% {
        background-color: rgba(165, 165, 165, 0.1);
      }
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: skeleton-gradient 1.5s infinite ease-in-out;
    }
  `,
};
