"use client";
import { HeartIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";

export default function ContentList() {
  const [activeTab, setActiveTab] = useState("전체");
  const [showArticle, setShowArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const tabs = ["전체", "아티클", "자녀소통법"];

  const articles = {
    top: {
      title: "주택청약통장 월 납입한도 25만원으로 상향",
      mainPoints: [
        "주택청약통장 월 납입한도가 40년 만에 10만원에서 25만원으로 상향조정됐습니다.",
        "주택도시기금법 시행규칙 개정안이 입법예고되어 내년 상반기 중 시행될 예정입니다.",
        "개정안에는 청약저축 납입 인정액 상향과 함께 청약 제도 전반의 개선안이 포함되어 있습니다.",
        "기존 가입자도 월 납입한도를 25만원까지 상향할 수 있습니다.",
      ],
      examples: [
        "1983년부터 40년간 유지되어온 10만원 한도가 상향조정",
        "KB국민·신한·하나·우리은행 등 주요 시중은행에서 안내 예정",
      ],
    },
    financial: {
      title: "원활한 가업승계를 위한 준비",
      mainPoints: [
        "가업승계는 장기적인 계획과 준비가 필요한 과정입니다.",
        "세제 혜택을 최대한 활용하여 승계 비용을 절감할 수 있습니다.",
        "전문가의 조언을 통해 법적 리스크를 최소화해야 합니다.",
        "승계 과정에서 발생할 수 있는 가족 간 갈등 관리가 중요합니다.",
      ],
      examples: [
        "성공적인 가업승계 사례 연구",
        "가업승계 시 고려해야 할 세무 전략",
      ],
    },
  };

  const handleArticleClick = (articleType) => {
    setSelectedArticle(articleType);
    setShowArticle(true);
  };

  if (showArticle) {
    const content = articles[selectedArticle];
    return (
      <div className="px-5 py-4">
        <button
          onClick={() => setShowArticle(false)}
          className="flex items-center text-gray-500 mb-6"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          뒤로가기
        </button>

        <article className="bg-white rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-6">{content.title}</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">주요 내용</h2>
              <ul className="space-y-2">
                {content.mainPoints.map((point, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    • {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">사례</h2>
              <ul className="space-y-2">
                {content.examples.map((example, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    • {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto px-6">
      <div className="flex gap-3 mb-8 overflow-x-auto py-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">오늘의 추천 지식 TOP 3</h2>
        <p className="text-gray-500 text-sm mb-6">
          가장 인기 있던 아티클을 모아봤어요
        </p>

        <div className="space-y-4">
          <article
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer"
            onClick={() => handleArticleClick("top")}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <span className="text-blue-500 text-sm font-medium">
                  주택청약 정보
                </span>
                <h3 className="text-xl font-bold mt-2 leading-tight">
                  주택청약통장 월 납입한도,
                  <br />
                  25만원으로 상향
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  40년 만에 바뀐 청약통장 납입한도, 자세히 알아보기
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className="bg-yellow-400 text-white rounded-full px-3 py-1 text-sm font-medium">
                  1등
                </span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <HeartIcon />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <Image
                src="/images/AnalyzeIllustImg.svg"
                alt="주택청약 일러스트"
                width={200}
                height={120}
                className="rounded-lg"
              />
            </div>
          </article>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">오늘의 금융 아티클</h2>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          흥미로운 워울거리를 모아봤어요
        </p>

        <div className="mb-16">
          <article
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer"
            onClick={() => handleArticleClick("financial")}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <span className="text-blue-500 text-sm font-medium">
                  금융 아티클
                </span>
                <h3 className="text-xl font-bold mt-2 leading-tight">
                  원활한 가업승계를 위한 준비
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  성공적인 가업승계를 위한 핵심 포인트
                </p>
                <div className="mt-4">
                  <Image
                    src="/images/article.png"
                    width={100}
                    height={100}
                    alt="article"
                  />
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <HeartIcon />
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
