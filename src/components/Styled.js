import styled from 'styled-components'

const Styled = styled.div`
  /* border: 3px solid red; */
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  padding: 0;

  .content {
    flex: 1;
    overflow: hidden;

    .center {
      /* border: 2px solid blue; */
      display: flex;
      box-sizing: border-box;
      overflow: hidden;

      .slide {
        /* border: 1px solid gold; */
        box-sizing: border-box;
        flex: 1 0 ${({ flexBasis }) => flexBasis};
      }
    }

    .dots {
      /* border: 1px solid green; */
      min-height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      .dot {
        border: none;
        display: block;
        border-radius: 50%;
        margin: 0 0.1875rem;
        padding: 3.5px;
        background-color: #3332;
        transition: 0.3s ease;
        flex: 0;

        &--active {
          transform: scaleX(1.5);
          border-radius: 50px;
          background-color: #333;
        }

        &:hover {
          background-color: #333;
          cursor: pointer;
        }

        &:focus {
          transform: scaleX(1);
          background-color: #333;
          outline: none;
        }

        &:active {
          opacity: 0.8;
        }
      }
    }
  }
`

export default Styled
