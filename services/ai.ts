import { MOCK_PRODUCTS } from "../constants";

export const askAIAboutProducts = async (userQuery: string) => {
  // Mock response for now; backend will handle real AI answers later.
  const top3 = MOCK_PRODUCTS.slice(0, 3)
    .map((item) => `#${item.rank} ${item.brand} ${item.name}`)
    .join(", ");
  const biggestRise = MOCK_PRODUCTS.reduce((best, item) =>
    item.change > best.change ? item : best
  );
  const biggestDrop = MOCK_PRODUCTS.reduce((best, item) =>
    item.change < best.change ? item : best
  );

  return [
    `질문: "${userQuery}"`,
    "현재는 모의 응답을 반환합니다.",
    `Top 3: ${top3}`,
    `상승폭 최대: ${biggestRise.brand} ${biggestRise.name} (${biggestRise.change > 0 ? "+" : ""}${biggestRise.change})`,
    `하락폭 최대: ${biggestDrop.brand} ${biggestDrop.name} (${biggestDrop.change > 0 ? "+" : ""}${biggestDrop.change})`,
  ].join("\n");
};
