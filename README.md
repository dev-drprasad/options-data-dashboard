# Option Data Dashboard

See demo at [Dashboard Demo](https://dev-drprasad.github.io/options-data-dashboard/)

## Quick test

build artificat is committed in repo. To quickly see the demo:

```sh
# clone repo
git clone https://github.com/dev-drprasad/options-data-dashboard.git
```

```sh
# requires node
npx serve -s dist
```

UI will be running at [http://localhost:3000](http://localhost:3000)

## Development

Make sure `node v20.8.1` installed

Install dependencies using

```
npm i
```

and then start local development using

```
npm run dev
```

Local UI will be running at [http://localhost:5173/](http://localhost:5173/)

## Code Structure

Code architecture follows [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/overview). It is more understandable, structured and easy to maintain because of seperated responsibility

Few advantages:

- code is organized by scope, so it is easy to understand for new comers
- allows modification particular without affecting other layers
- easier to understand all domain features by looking at `features`
- Improves re-usability

## Design Decisions

### Libraries

#### [Apex Charts](https://apexcharts.com/)

Apexcharts is choosen because of its funtionality:

- responsiveness
- interactivity
- customizable
- free and open source

But when building compex financial charts, it is recomended to use specific financial chart libries like [TradingView](https://in.tradingview.com/), [HighChart](https://www.highcharts.com/)

#### [Antd](https://ant.design/)

Antd is choosen as design systems. It is battle-tested library. Covers almost all components every required in typical dashboards and it is free to use and easy to customize

#### [TypeScript](https://www.typescriptlang.org/)

Typescript is strongly typed programming language which compiles to javascript. It is choosen for following reasons:

- TypeScript code is more dependable and refactorable. This helps developers easily avoid mistakes and do rewrites
- provides a rapid feedback loop while developing/refactoring
- Bugs can be detected early
- supports class-based OOP principles such as classes, interfaces, and inheritance. The OOP paradigm helps develop well-organized, scalable code, which becomes more apparent as project develops in size and complexity.
- Very good IDE support

### Responsive Design

Application designed in such a way that it is responsive across desktops. Mobile support is not implemented due to time constraints

### Performance

Performance is very important when building financial dashboards due to large datasets and complex charts. Few techniques used to improve performaces are

#### Virtual List

Table component at `http://localhost:5173/table` is using virtualization. It allows us to render thousands of rows without degrading user interactivity.

#### Memoization

Memoization used (`useMemo`) to prevent same re-computations again and again. And also `useCallback` helps to prevent un-necessary UI re-renders

#### Code Splitting

With app size, our build artifcat also grows. This can cause app to take long time to load. Code-splitting can help “lazy-load” the things that are currently needed by the user, which can dramatically improve the performance of your app.

#### Network Optimization

Better compressions algos like Brotli can be used to improve network speed. HTTP2 can also be used to multiplex multiple requests improve speed. These are not part of this task as data is hardcodded.
