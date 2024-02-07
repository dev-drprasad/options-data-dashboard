import { Spin } from "antd";
import React, { CSSProperties } from "react";
import { FetchStatus } from "shared/utils";

export type ResourceAndNS<T> = { data: T; status: FetchStatus };

function StyleWrapper({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        color: "inherit",
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function HandleNoData({ children }: React.PropsWithChildren) {
  return children;
}

const CHILDREN_ORDER = [HandleNoData, undefined];

const checkIsReactElement = <T,>(v: React.ReactElement | SuccessRenderer<T>): v is React.ReactElement =>
  Object.hasOwn(v, "type");

const getOrderedChildren = <T,>(children: (React.ReactElement | SuccessRenderer<T>)[]) => {
  return CHILDREN_ORDER.map((expectedType) => {
    let expectedElement: unknown;
    for (const child of children) {
      if (expectedType === undefined) {
        if (!checkIsReactElement(child)) {
          expectedElement = child;
          break;
        }
      } else {
        if (checkIsReactElement(child)) {
          // @ts-ignore
          if (child.type.prototype.constructor.name === expectedType.prototype.constructor.name) {
            expectedElement = child;
            break;
          }
        }
      }
    }
    return expectedElement;
  }) as [React.ReactElement, SuccessRenderer<T>];
};

type SuccessRenderer<T> = (data: T) => React.JSX.Element;

interface FetchStatusHandlerProps<TData> {
  style?: CSSProperties;
  noDataMessage?: React.ReactNode;
  status: FetchStatus;
  data?: TData;
  children: SuccessRenderer<TData> | (SuccessRenderer<TData> | React.ReactElement)[];
}

const checkIfHasData = <TData,>(status: FetchStatus, data: TData | undefined): data is TData =>
  status.isSuccess && status.hasData;

export default function FetchStatusHandler<TData>(props: FetchStatusHandlerProps<TData>) {
  const { status, children, style, noDataMessage, data } = props;

  if (status.isInit) return null;

  const orderedChildren = getOrderedChildren(
    typeof children === "function" ? [children as SuccessRenderer<TData>] : (children as React.ReactElement[]),
  );
  console.log("orderedChildren :>> ", orderedChildren);
  const [, successRenderer] = orderedChildren;

  if (status.isSuccess) {
    if (!checkIfHasData(status, data)) return <StyleWrapper style={style}>{noDataMessage || "No data."}</StyleWrapper>;
    return successRenderer(data);
  }

  if (status.isLoading || status.isError) {
    return (
      <StyleWrapper style={style}>
        {status.isLoading && <Spin />}
        {status.isError && "Oops! Something went wrong."}
      </StyleWrapper>
    );
  }

  return null;
}

FetchStatusHandler.NoData = HandleNoData;
