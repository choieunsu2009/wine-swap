"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Heart,
  Share2,
  Home,
  MessageCircle,
  User,
  ShoppingBag,
  Package,
  Utensils,
  Shirt,
  Smartphone,
  MoreHorizontal,
  Send,
  MoreVertical,
  ArrowLeft,
  Upload,
  X,
  AwardIcon as Won,
  AlertCircle,
  Edit,
  Star,
  Award,
  MapPin,
  Tag,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

// 데이터
const dormProducts = [
  {
    id: 1,
    title: "화장지 12롤",
    price: "8,000원",
    image: "/images/tissue.webp",
    category: "생활용품",
    seller: "정문경",
    condition: "새상품",
    floor: "3층",
    likes: 12,
    description: "코스트코에서 대용량으로 샀는데 너무 많아서 나눠팔아요.",
    brand: "크리넥스",
    purchaseDate: "1주일 이내",
    type: "판매",
  },
  {
    id: 2,
    title: "투명테이프 5개",
    price: "3,000원",
    image: "/images/tape.webp",
    category: "학용품",
    seller: "허재원",
    condition: "새상품",
    floor: "2층",
    likes: 8,
    description: "문구점에서 대량구매했는데 남아서 팔아요.",
    brand: "3M",
    purchaseDate: "1개월 이내",
    type: "판매",
  },
  {
    id: 3,
    title: "수건 세트",
    price: "대여",
    image: "/images/towels.webp",
    category: "생활용품",
    seller: "최은수",
    condition: "거의새것",
    floor: "4층",
    likes: 15,
    description: "집에서 가져온 수건 세트인데 기숙사에서 쓰기엔 너무 많아서 대여해요.",
    brand: "무인양품",
    purchaseDate: "3개월 이내",
    type: "대여",
  },
  {
    id: 4,
    title: "진라면 매운맛 9개입",
    price: "15,000원",
    image: "/images/ramen.webp",
    category: "식품",
    seller: "양선민",
    condition: "새상품",
    floor: "2층",
    likes: 7,
    description: "야식용으로 대량구매했는데 다이어트 시작해서 팔아요.",
    brand: "오뚜기",
    purchaseDate: "1주일 이내",
    type: "판매",
  },
  {
    id: 5,
    title: "농구화 270mm",
    price: "25,000원",
    image: "/images/sneakers.webp",
    category: "의류",
    seller: "신재호",
    condition: "좋음",
    floor: "4층",
    likes: 20,
    description: "농구할 때 신던 운동화인데 새 운동화 사서 팔아요.",
    brand: "나이키",
    purchaseDate: "6개월 이내",
    type: "판매",
  },
  {
    id: 6,
    title: "노트북 거치대",
    price: "삽니다",
    image: "/images/laptop-stand.webp",
    category: "전자기기",
    seller: "허재원",
    condition: "상관없음",
    floor: "2층",
    likes: 11,
    description: "온라인 수업용으로 노트북 거치대 구해요.",
    brand: "상관없음",
    purchaseDate: "상관없음",
    type: "삽니다", // "대여" → "삽니다"
  },
  {
    id: 7,
    title: "전자사전",
    price: "10,000원",
    image: "/images/dictionary.webp",
    category: "학용품",
    seller: "정문경",
    condition: "좋음",
    floor: "3층",
    likes: 9,
    description: "영어 공부할 때 쓰던 전자사전이에요.",
    brand: "삼성",
    purchaseDate: "1년 이상",
    type: "판매",
  },
  {
    id: 8,
    title: "무선 이어폰",
    price: "찾아요",
    image: "/images/earphones.webp",
    category: "전자기기",
    seller: "최은수",
    condition: "상관없음",
    floor: "4층",
    likes: 14,
    description: "무선 이어폰 찾아요! 갤럭시 버즈에요.",
    brand: "상관없음",
    purchaseDate: "상관없음",
    type: "찾아요", // "삽니다" → "찾아요"
  },
]

const chatUsers = [
  {
    id: 1,
    name: "정문경",
    unreadCount: 3,
    lastMessage: "화장지 아직 있나요?",
    time: "오후 2:30",
    avatar: "정",
    productName: "화장지 12롤",
    productImage: "/images/tissue.webp",
  },
  {
    id: 2,
    name: "허재원",
    unreadCount: 1,
    lastMessage: "노트북 거치대 구해요!",
    time: "오후 1:15",
    avatar: "허",
    productName: "노트북 거치대",
    productImage: "/images/laptop-stand.webp",
  },
  {
    id: 3,
    name: "최은수",
    unreadCount: 5,
    lastMessage: "수건 나눔 받고 싶어요",
    time: "오전 11:20",
    avatar: "최",
    productName: "수건 세트",
    productImage: "/images/towels.webp",
  },
  {
    id: 4,
    name: "양선민",
    unreadCount: 2,
    lastMessage: "라면 언제 받을 수 있나요?",
    time: "오전 10:45",
    avatar: "양",
    productName: "진라면 매운맛 9개입",
    productImage: "/images/ramen.webp",
  },
  {
    id: 5,
    name: "신재호",
    unreadCount: 1,
    lastMessage: "운동화 거래 감사합니다!",
    time: "어제",
    avatar: "신",
    productName: "농구화 270mm",
    productImage: "/images/sneakers.webp",
  },
]

const userProducts = [
  {
    id: 1,
    title: "진라면 매운맛 9개입",
    price: "15,000원",
    image: "/images/ramen.webp",
    status: "판매중",
    likes: 22,
    category: "식품",
    condition: "새상품",
    type: "판매",
  },
  {
    id: 2,
    title: "노트북 거치대",
    price: "삽니다",
    image: "/images/laptop-stand.webp",
    status: "구매중",
    likes: 18,
    category: "전자기기",
    condition: "거의새것",
    type: "삽니다", // "대여" → "삽니다"
  },
  {
    id: 3,
    title: "수건 세트",
    price: "8,000원",
    image: "/images/towels.webp",
    status: "판매완료",
    likes: 25,
    category: "생활용품",
    condition: "좋음",
    type: "판매",
  },
  {
    id: 4,
    title: "무선 이어폰",
    price: "찾아요",
    image: "/images/earphones.webp",
    status: "찾는중",
    likes: 17,
    category: "전자기기",
    condition: "상관없음",
    type: "찾아요", // "삽니다" → "찾아요"
  },
]

const userReviews = [
  {
    id: 1,
    reviewer: "허재원",
    rating: 5,
    comment: "상품 상태 정말 좋고 빠른 거래였어요! 추천합니다.",
    date: "2024-01-15",
  },
  {
    id: 2,
    reviewer: "최은수",
    rating: 5,
    comment: "설명과 정확히 일치하고 친절하게 거래해주셨어요.",
    date: "2024-01-10",
  },
  { id: 3, reviewer: "양선민", rating: 4, comment: "좋은 거래였습니다. 감사해요!", date: "2024-01-05" },
]

const exampleImages = {
  화장지: "/images/tissue.webp",
  휴지: "/images/tissue.webp",
  투명테이프: "/images/tape.webp",
  테이프: "/images/tape.webp",
  수건: "/images/towels.webp",
  라면: "/images/ramen.webp",
  운동화: "/images/sneakers.webp",
  신발: "/images/sneakers.webp",
  노트북거치대: "/images/laptop-stand.webp",
  거치대: "/images/laptop-stand.webp",
  이어폰: "/images/earphones.webp",
  에어팟: "/images/earphones.webp",
  전자사전: "/images/dictionary.webp",
  사전: "/images/dictionary.webp",
}

const categoryIcons = {
  생활용품: Package,
  학용품: Package,
  의류: Shirt,
  식품: Utensils,
  전자기기: Smartphone,
  기타: MoreHorizontal,
}
const marketStats = { activeProducts: 8, totalStudents: 160, successfulTrades: 19 }

export default function WineSwapPage() {
  const [currentView, setCurrentView] = useState("home")
  const [selectedCategory, setSelectedCategory] = useState("전체 상품")
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // 채팅 상태
  const [activeUser, setActiveUser] = useState(chatUsers[0])
  const [messageInput, setMessageInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "정문경", content: "안녕하세요! 화장지 12롤에 관심이 있어요.", time: "오후 2:25", isMe: false },
    { id: 2, sender: "me", content: "안녕하세요! 네, 아직 있어요. 새상품이에요!", time: "오후 2:26", isMe: true },
    { id: 3, sender: "정문경", content: "언제 받을 수 있을까요? 급해서요ㅠㅠ", time: "오후 2:27", isMe: false },
    { id: 4, sender: "me", content: "오늘 저녁에 1층 로비에서 만날까요?", time: "오후 2:28", isMe: true },
    { id: 5, sender: "정문경", content: "좋아요! 8시쯤 어떠세요?", time: "오후 2:29", isMe: false },
    { id: 6, sender: "me", content: "네 좋아요! 그럼 1층 로비에서 8시에 만나요~", time: "오후 2:30", isMe: true },
  ])

  // 상품 등록 상태
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    condition: "",
    quantity: "1",
    brand: "",
    purchaseDate: "",
    tag: "",
  })
  const [images, setImages] = useState<string[]>([])
  const [priceError, setPriceError] = useState("")
  const [activeTab, setActiveTab] = useState("basic")

  // 프로필 상태
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "정문경",
    trustScore: 4.8,
    location: "3층 301호",
    joinDate: "2024년 3월",
    totalSales: 12,
    totalPurchases: 8,
    specialties: ["식품", "생활용품", "학용품"],
    isVerified: true,
  })

  const categories = ["전체 상품", "생활용품", "학용품", "의류", "식품", "전자기기", "기타"]

  const filteredProducts = dormProducts.filter((product) => {
    const matchesCategory = selectedCategory === "전체 상품" || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    let matchesPrice = true
    if (priceFilter.min || priceFilter.max) {
      const productPrice = Number.parseInt(product.price.replace(/[^0-9]/g, "")) || 0
      const minPrice = Number.parseInt(priceFilter.min) || 0
      const maxPrice = Number.parseInt(priceFilter.max) || Number.POSITIVE_INFINITY
      matchesPrice = productPrice >= minPrice && productPrice <= maxPrice
    }
    return matchesCategory && matchesSearch && matchesPrice
  })

  // 유틸리티 함수들
  const getTagColor = (type: string) => {
    switch (type) {
      case "대여":
        return "bg-green-500"
      case "삽니다":
        return "bg-blue-500"
      case "찾아요":
        return "bg-yellow-500"
      default:
        return "bg-[#783445]"
    }
  }

  const getTrustColor = (score: number) => {
    if (score >= 4.5) return "text-green-600"
    if (score >= 4.0) return "text-[#92CEEE]"
    return "text-yellow-500"
  }

  const getTrustLabel = (score: number) => {
    if (score >= 4.5) return "최상급"
    if (score >= 4.0) return "매우 좋음"
    return "좋음"
  }

  // 채팅 함수
  const sendMessage = () => {
    if (messageInput.trim()) {
      const now = new Date()
      const timeString = `오후 ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`
      const newMessage = {
        id: chatMessages.length + 1,
        sender: "me",
        content: messageInput,
        time: timeString,
        isMe: true,
      }
      setChatMessages((prev) => [...prev, newMessage])
      setMessageInput("")
      setTimeout(() => {
        const replyMessage = {
          id: chatMessages.length + 2,
          sender: activeUser.name,
          content: "네, 좋아요! 그럼 그때 봐요~",
          time: `오후 ${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, "0")}`,
          isMe: false,
        }
        setChatMessages((prev) => [...prev, replyMessage])
      }, 1000)
    }
  }

  // 상품 등록 함수들
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const addExampleImage = () => {
    const productName = formData.name.toLowerCase().replace(/\s+/g, "")
    const matchedImage = Object.entries(exampleImages).find(([key]) => productName.includes(key.toLowerCase()))
    if (matchedImage && !images.includes(matchedImage[1])) {
      setImages((prev) => [...prev, matchedImage[1]])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const validatePrice = (value: string) => {
    if (!value) {
      setPriceError("가격을 입력해주세요.")
      return false
    }
    const numericValue = value.replace(/[^0-9]/g, "")
    if (!numericValue || Number.parseInt(numericValue) <= 0) {
      setPriceError("올바른 가격을 입력해주세요.")
      return false
    }
    if (Number.parseInt(numericValue) > 10000000) {
      setPriceError("가격이 너무 높습니다. (최대 1,000만원)")
      return false
    }
    setPriceError("")
    return true
  }

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    setFormData((prev) => ({ ...prev, price: formattedValue }))
    if (formData.tag === "판매" && numericValue) {
      validatePrice(numericValue)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.tag === "판매") {
      const numericPrice = formData.price.replace(/[^0-9]/g, "")
      if (!validatePrice(numericPrice)) {
        setActiveTab("pricing")
        return
      }
    }
    console.log("Product listing data:", formData, images)
    setCurrentView("home")
  }

  const handleTagChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tag: value }))
    if (value !== "판매") {
      setPriceError("")
      setFormData((prev) => ({ ...prev, price: "" }))
    }
  }

  // 컴포넌트들
  const ProductCard = ({ product, onClick }: { product: any; onClick: () => void }) => {
    const [isLiked, setIsLiked] = useState(false)
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
        <div className="relative">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
          <Badge className={`absolute top-2 left-2 ${getTagColor(product.type)} text-white`}>{product.type}</Badge>
          <Badge className="absolute bottom-2 left-2 bg-[#783445] text-white">{product.floor}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium mb-1 text-[#783445]">{product.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.condition}</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-[#783445]">{product.price}</span>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">{product.likes}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-[#F9EEDA] text-[#783445] text-xs">
              {product.category}
            </Badge>
            <p className="text-xs text-gray-600">by {product.seller}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const Sidebar = () => (
    <div className="w-80 bg-gray-200 p-6">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" className="text-black hover:bg-[#F9EEDA] p-2" onClick={() => setCurrentView("home")}>
            <Home className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <img src="/images/wineswap-logo.png" alt="WineSwap Logo" className="w-8 h-8" />
            <span className="font-bold text-[#783445] text-lg">WineSwap.</span>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-medium mb-3 text-[#783445]">상품 카테고리</h3>
        {categories.map((category) => {
          const IconComponent =
            category === "전체 상품" ? ShoppingBag : categoryIcons[category as keyof typeof categoryIcons] || Package
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className={`w-full justify-start mb-2 ${selectedCategory === category ? "bg-[#783445] text-white hover:bg-[#CD8D9D]" : "text-[#783445] hover:bg-[#F9EEDA] border border-[#CD8D9D]"}`}
              onClick={() => setSelectedCategory(category)}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {category}
            </Button>
          )
        })}
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-3 text-[#783445]">가격 범위</h3>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="최소 (원)"
            value={priceFilter.min}
            onChange={(e) => setPriceFilter((prev) => ({ ...prev, min: e.target.value }))}
            className="bg-white border-[#CD8D9D] focus:border-[#783445]"
          />
          <span className="self-center text-[#783445]">-</span>
          <Input
            placeholder="최대 (원)"
            value={priceFilter.max}
            onChange={(e) => setPriceFilter((prev) => ({ ...prev, max: e.target.value }))}
            className="bg-white border-[#CD8D9D] focus:border-[#783445]"
          />
        </div>
        <div className="space-y-2">
          <Button className="w-full bg-[#783445] text-white hover:bg-[#CD8D9D]">가격 필터 적용</Button>
          <Button
            className="w-full bg-[#F9EEDA] text-[#783445] hover:bg-[#CD8D9D] hover:text-white border border-[#CD8D9D]"
            onClick={() => setCurrentView("upload")}
          >
            상품 등록하기
          </Button>
        </div>
      </div>
      <div className="bg-[#F9EEDA] p-4 rounded-lg border border-[#CD8D9D]">
        <h4 className="font-medium text-[#783445] mb-2">기숙사 마켓 통계</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>활성 상품:</span>
            <span className="font-medium">{marketStats.activeProducts}</span>
          </div>
          <div className="flex justify-between">
            <span>기숙사 학생:</span>
            <span className="font-medium">{marketStats.totalStudents}</span>
          </div>
          <div className="flex justify-between">
            <span>성공적인 거래:</span>
            <span className="font-medium">{marketStats.successfulTrades}</span>
          </div>
        </div>
      </div>
    </div>
  )

  const TopNav = () => (
    <div className="flex items-center justify-between mb-8 bg-[#F9EEDA] p-4 rounded-lg border-2 border-[#CD8D9D]">
      <div className="flex items-center gap-4">
        <img src="/images/wineswap-logo.png" alt="WineSwap Logo" className="w-10 h-10" />
        <div>
          <h1 className="font-bold text-[#783445] text-xl">WineSwap.</h1>
          <p className="text-sm text-[#CD8D9D]">기숙사 학생 중고거래 플랫폼</p>
        </div>
      </div>
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CD8D9D] w-4 h-4" />
          <Input
            placeholder="상품명, 카테고리, 판매자 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-[#CD8D9D] focus:border-[#783445]"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-[#783445] hover:bg-[#CD8D9D] hover:text-white p-2"
          onClick={() => setCurrentView("profile")}
          title="프로필"
        >
          <User className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          className="text-[#783445] hover:bg-[#CD8D9D] hover:text-white p-2"
          onClick={() => setCurrentView("chat")}
          title="메시지"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )

  // 메인 렌더링
  const renderContent = () => {
    switch (currentView) {
      case "chat":
        return (
          <div className="flex h-screen bg-gray-100">
            <div className="w-80 bg-gray-200 border-r">
              <div className="p-4 bg-[#F9EEDA] border-b">
                <div className="flex items-center gap-2">
                  <img src="/images/wineswap-logo.png" alt="WineSwap Logo" className="w-6 h-6" />
                  <h2 className="font-semibold text-lg text-[#783445]">WineSwap 채팅</h2>
                </div>
              </div>
              <div className="overflow-y-auto">
                {chatUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 border-b cursor-pointer hover:bg-[#F9EEDA] transition-colors ${activeUser.id === user.id ? "bg-[#F9EEDA] border-l-4 border-l-[#783445]" : ""}`}
                    onClick={() => setActiveUser(user)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#783445] text-white text-sm">{user.avatar}</AvatarFallback>
                        </Avatar>
                        {user.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 bg-[#CD8D9D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {user.unreadCount}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm text-[#783445]">{user.name}</span>
                          <span className="text-xs text-[#CD8D9D]">{user.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="p-4 bg-[#F9EEDA] border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentView("home")}
                    className="text-[#783445] hover:bg-[#CD8D9D] hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />홈
                  </Button>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#783445] text-white text-sm">{activeUser.avatar}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-[#783445]">{activeUser.name}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-[#783445] hover:bg-[#CD8D9D] hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isMe ? "bg-[#92CEEE] text-black" : "bg-white border border-[#CD8D9D]"}`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t bg-[#F9EEDA]">
                <div className="flex gap-2">
                  <Input
                    placeholder="메시지를 입력하세요..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 border-[#CD8D9D] focus:border-[#783445]"
                  />
                  <Button
                    onClick={sendMessage}
                    className="bg-[#783445] text-white hover:bg-[#CD8D9D] px-6"
                    disabled={!messageInput.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-80 bg-[#F9EEDA] p-4 border-l-2 border-[#CD8D9D]">
              <div className="text-center mb-6">
                <div className="w-full h-48 rounded-lg mb-4 border-2 border-[#CD8D9D] overflow-hidden">
                  <img
                    src={activeUser.productImage || "/placeholder.svg"}
                    alt={activeUser.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#783445]">{activeUser.productName}</h3>
                <p className="text-xl font-bold text-[#783445] mb-2">8,000원</p>
                <div className="flex justify-center gap-2">
                  <Badge className="bg-[#783445] text-white">판매</Badge>
                  <Badge className="bg-[#783445] text-white">생활용품</Badge>
                </div>
              </div>
              <Card className="border-[#CD8D9D]">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 bg-[#783445] text-white p-2 rounded">상품 정보</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium text-[#783445]">상품명:</span> {activeUser.productName}
                    </p>
                    <p>
                      <span className="font-medium text-[#783445]">카테고리:</span> 생활용품
                    </p>
                    <p>
                      <span className="font-medium text-[#783445]">상태:</span> 새상품
                    </p>
                    <p>
                      <span className="font-medium text-[#783445]">거래방법:</span> 직거래
                    </p>
                    <p>
                      <span className="font-medium text-[#783445]">위치:</span> 기숙사 3층
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4 space-y-2">
                <Button className="w-full bg-[#783445] text-white hover:bg-[#CD8D9D]">가격 제안하기</Button>
                <Button variant="outline" className="w-full border-[#783445] text-[#783445] hover:bg-[#F9EEDA]">
                  찜하기
                </Button>
              </div>
            </div>
          </div>
        )

      case "upload":
        return (
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView("home")}
                  className="p-2 text-[#783445] hover:bg-[#F9EEDA]"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <img src="/images/wineswap-logo.png" alt="WineSwap Logo" className="w-8 h-8" />
                <h1 className="text-2xl font-bold text-[#783445]">상품 등록</h1>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">기본 정보</TabsTrigger>
                    <TabsTrigger value="images">이미지</TabsTrigger>
                    <TabsTrigger
                      value="pricing"
                      disabled={formData.tag !== "판매"}
                      className={formData.tag !== "판매" ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      가격 설정
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="space-y-6">
                    <Card>
                      <CardHeader className="bg-[#F9EEDA] border-b border-[#CD8D9D]">
                        <CardTitle className="text-[#783445]">기본 상품 정보</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-[#783445]">상품명</label>
                          <Input
                            value={formData.name}
                            onChange={(e) => {
                              setFormData((prev) => ({ ...prev, name: e.target.value }))
                              setTimeout(addExampleImage, 100)
                            }}
                            placeholder="예: 화장지 12롤"
                            className="border-[#CD8D9D] focus:border-[#783445]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-[#783445]">거래 유형</label>
                          <Select value={formData.tag} onValueChange={handleTagChange} required>
                            <SelectTrigger className="border-[#CD8D9D] focus:border-[#783445]">
                              <SelectValue placeholder="거래 유형 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="판매">판매</SelectItem>
                              <SelectItem value="대여">대여</SelectItem>
                              <SelectItem value="삽니다">삽니다</SelectItem>
                              <SelectItem value="찾아요">찾아요</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-[#783445]">카테고리</label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                              required
                            >
                              <SelectTrigger className="border-[#CD8D9D] focus:border-[#783445]">
                                <SelectValue placeholder="판매상품 종류 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="생활용품">생활용품</SelectItem>
                                <SelectItem value="전자기기">전자기기</SelectItem>
                                <SelectItem value="의류">의류</SelectItem>
                                <SelectItem value="학용품">학용품</SelectItem>
                                <SelectItem value="식품">식품</SelectItem>
                                <SelectItem value="도서">도서</SelectItem>
                                <SelectItem value="기타">기타</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-[#783445]">브랜드 (선택사항)</label>
                            <Input
                              value={formData.brand}
                              onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
                              placeholder="예: 나이키, 삼성 등"
                              className="border-[#CD8D9D] focus:border-[#783445]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-[#783445]">설명</label>
                          <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="상품의 상태, 사용기간, 특징 등을 자세히 설명해주세요..."
                            rows={4}
                            className="border-[#CD8D9D] focus:border-[#783445]"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-[#783445]">상태</label>
                            <Select
                              value={formData.condition}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
                              required
                            >
                              <SelectTrigger className="border-[#CD8D9D] focus:border-[#783445]">
                                <SelectValue placeholder="상태 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="새상품">새상품</SelectItem>
                                <SelectItem value="거의새것">거의새것</SelectItem>
                                <SelectItem value="매우좋음">매우좋음</SelectItem>
                                <SelectItem value="좋음">좋음</SelectItem>
                                <SelectItem value="보통">보통</SelectItem>
                                {formData.tag === "대여" && <SelectItem value="상관없음">상관없음</SelectItem>}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-[#783445]">
                              {formData.tag === "삽니다" ? "구매 희망일" : "구매일자"}
                            </label>
                            <Select
                              value={formData.purchaseDate}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, purchaseDate: value }))}
                            >
                              <SelectTrigger className="border-[#CD8D9D] focus:border-[#783445]">
                                <SelectValue placeholder={formData.tag === "삽니다" ? "구매 희망일" : "구매 시기"} />
                              </SelectTrigger>
                              <SelectContent>
                                {formData.tag === "삽니다" ? (
                                  <>
                                    <SelectItem value="즉시">즉시</SelectItem>
                                    <SelectItem value="1주일 이내">1주일 이내</SelectItem>
                                    <SelectItem value="1개월 이내">1개월 이내</SelectItem>
                                    <SelectItem value="상관없음">상관없음</SelectItem>
                                  </>
                                ) : (
                                  <>
                                    <SelectItem value="1주일 이내">1주일 이내</SelectItem>
                                    <SelectItem value="1개월 이내">1개월 이내</SelectItem>
                                    <SelectItem value="3개월 이내">3개월 이내</SelectItem>
                                    <SelectItem value="6개월 이내">6개월 이내</SelectItem>
                                    <SelectItem value="1년 이내">1년 이내</SelectItem>
                                    <SelectItem value="1년 이상">1년 이상</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-[#783445]">수량</label>
                            <Input
                              value={formData.quantity}
                              onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                              placeholder="1"
                              type="number"
                              min="1"
                              className="border-[#CD8D9D] focus:border-[#783445]"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="images" className="space-y-6">
                    <Card>
                      <CardHeader className="bg-[#F9EEDA] border-b border-[#CD8D9D]">
                        <CardTitle className="text-[#783445] flex items-center gap-2">
                          <Package className="w-5 h-5" />
                          상품 이미지
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`상품 이미지 ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-[#CD8D9D]"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                                onClick={() => removeImage(index)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                          {images.length < 6 && (
                            <label className="w-full h-32 border-2 border-dashed border-[#CD8D9D] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#783445] hover:bg-[#F9EEDA]">
                              <Upload className="w-6 h-6 text-[#CD8D9D] mb-2" />
                              <span className="text-sm text-[#CD8D9D]">이미지 추가</span>
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </label>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">상품의 고품질 이미지를 최대 6장까지 업로드하세요.</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addExampleImage}
                            className="border-[#783445] text-[#783445] hover:bg-[#F9EEDA]"
                          >
                            예제 이미지 추가
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="pricing" className="space-y-6">
                    <Card>
                      <CardHeader className="bg-[#F9EEDA] border-b border-[#CD8D9D]">
                        <CardTitle className="text-[#783445] flex items-center gap-2">
                          <Won className="w-5 h-5" />
                          가격 설정
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-[#783445]">판매 가격</label>
                          <div className="relative">
                            <Input
                              value={formData.price}
                              onChange={(e) => handlePriceChange(e.target.value)}
                              placeholder="예: 10,000"
                              className={`border-[#CD8D9D] focus:border-[#783445] pr-12 ${priceError ? "border-red-500" : ""}`}
                              required={formData.tag === "판매"}
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              원
                            </span>
                          </div>
                          {priceError && (
                            <Alert className="mt-2 border-red-200 bg-red-50">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <AlertDescription className="text-red-600">{priceError}</AlertDescription>
                            </Alert>
                          )}
                        </div>
                        <div className="bg-[#F9EEDA] p-4 rounded-lg border border-[#CD8D9D]">
                          <h4 className="font-medium text-[#783445] mb-2">가격 설정 팁</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 비슷한 상품의 시세를 확인해보세요</li>
                            <li>• 상품 상태에 따라 적정 가격을 책정하세요</li>
                            <li>• 협상 가능한 가격으로 설정하면 거래 확률이 높아집니다</li>
                            <li>• 나눔이나 구매 요청은 가격 설정이 필요하지 않습니다</li>
                          </ul>
                        </div>
                        {formData.price && !priceError && (
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="text-green-700 font-medium">설정된 가격: {formData.price}원</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                <div className="flex gap-4 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentView("home")}
                    className="border-[#CD8D9D] text-[#783445] hover:bg-[#F9EEDA]"
                  >
                    취소
                  </Button>
                  <Button type="submit" className="bg-[#783445] text-white hover:bg-[#CD8D9D] px-8">
                    상품 등록
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView("home")}
                  className="p-2 text-[#783445] hover:bg-[#F9EEDA]"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <img src="/images/wineswap-logo.png" alt="WineSwap Logo" className="w-8 h-8" />
                <h1 className="text-2xl font-bold text-[#783445]">학생 프로필</h1>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <Avatar className="w-24 h-24">
                            <AvatarFallback className="bg-[#783445] text-white text-2xl">정</AvatarFallback>
                          </Avatar>
                          {userInfo.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-[#92CEEE] rounded-full p-1">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      <CardTitle className="flex items-center justify-center gap-2">
                        {userInfo.name}
                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                      <div className="flex items-center justify-center gap-1 text-sm text-[#CD8D9D]">
                        <MapPin className="w-4 h-4" />
                        {userInfo.location}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-4 bg-[#F9EEDA] rounded-lg border-2 border-[#CD8D9D]">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Package className="w-4 h-4 text-[#783445]" />
                          <span className="text-sm text-[#783445]">신뢰도</span>
                        </div>
                        <div className={`text-2xl font-bold ${getTrustColor(userInfo.trustScore)}`}>
                          {userInfo.trustScore}/5.0
                        </div>
                        <div className="text-sm text-[#CD8D9D]">{getTrustLabel(userInfo.trustScore)}</div>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(userInfo.trustScore) ? "fill-[#92CEEE] text-[#92CEEE]" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-white rounded-lg border border-[#CD8D9D]">
                          <div className="text-lg font-bold text-[#783445]">{userInfo.totalSales}</div>
                          <div className="text-sm text-[#CD8D9D]">판매한 상품</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-[#CD8D9D]">
                          <div className="text-lg font-bold text-[#783445]">{userInfo.totalPurchases}</div>
                          <div className="text-sm text-[#CD8D9D]">구매한 상품</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#783445] mb-2">주요 거래 카테고리</h4>
                        <div className="flex flex-wrap gap-2">
                          {userInfo.specialties.map((specialty) => (
                            <Badge key={specialty} className="bg-[#783445] text-white">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">가입일</span>
                          <span>{userInfo.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">인증</span>
                          <Badge className="bg-[#92CEEE] text-white">인증됨</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-2">
                  <Tabs defaultValue="products" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="products">판매 상품</TabsTrigger>
                      <TabsTrigger value="reviews">후기</TabsTrigger>
                    </TabsList>
                    <TabsContent value="products" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userProducts.map((product) => (
                          <Card key={product.id} className="overflow-hidden">
                            <div className="relative">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                              />
                              <Badge
                                className={`absolute top-2 left-2 ${product.type === "대여" ? "bg-green-500" : product.type === "삽니다" ? "bg-blue-500" : "bg-[#783445]"} text-white`}
                              >
                                {product.type}
                              </Badge>
                              <Badge
                                className={`absolute top-2 right-2 ${product.status === "판매완료" || product.status === "대여완료" ? "bg-gray-500" : product.status === "예약중" || product.status === "구매중" ? "bg-[#CD8D9D]" : "bg-[#92CEEE]"} text-white`}
                              >
                                {product.status}
                              </Badge>
                              <div className="absolute bottom-2 right-2 flex gap-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
                                >
                                  <Heart className="w-4 h-4 text-gray-600" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
                                >
                                  <Share2 className="w-4 h-4 text-gray-600" />
                                </Button>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium mb-1 text-[#783445]">{product.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-[#783445]">{product.price}</span>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Heart className="w-4 h-4" />
                                  {product.likes}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="reviews" className="space-y-4">
                      {userReviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-[#783445] text-white text-sm">
                                    {review.reviewer[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{review.reviewer}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? "fill-[#92CEEE] text-[#92CEEE]" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        )

      case "product-detail":
        if (!selectedProduct) return null
        return (
          <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-8 bg-[#F9EEDA] p-4 rounded-lg border-2 border-[#CD8D9D]">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentView("home")}
                    className="text-[#783445] hover:bg-[#CD8D9D] hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    목록으로
                  </Button>
                  <img src="/images/wineswap-logo.png" alt="WineSwap Logo" className="w-8 h-8" />
                  <div>
                    <h1 className="font-bold text-[#783445] text-lg">상품 상세</h1>
                    <p className="text-sm text-[#CD8D9D]">기숙사 학생 중고거래 플랫폼</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="text-[#783445] hover:bg-[#CD8D9D] hover:text-white p-2"
                    title="프로필"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-[#783445] hover:bg-[#CD8D9D] hover:text-white p-2"
                    onClick={() => setCurrentView("chat")}
                    title="메시지"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.title}
                      className="w-full h-96 object-cover rounded-lg border-2 border-[#CD8D9D]"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="sm" variant="secondary" className="w-10 h-10 p-0 bg-white/80 hover:bg-white">
                        <Heart className="w-5 h-5 text-gray-600" />
                      </Button>
                      <Button size="sm" variant="secondary" className="w-10 h-10 p-0 bg-white/80 hover:bg-white">
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </Button>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-[#783445] text-white">{selectedProduct.floor}</Badge>
                  </div>
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="bg-[#F9EEDA] border-b border-[#CD8D9D]">
                      <CardTitle className="text-[#783445] flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        상품 정보
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h1 className="text-2xl font-bold text-[#783445] mb-2">{selectedProduct.title}</h1>
                          <div className="flex items-center gap-2 mb-4">
                            <Badge className={`${getTagColor(selectedProduct.type)} text-white`}>
                              {selectedProduct.type}
                            </Badge>
                            <Badge className="bg-[#783445] text-white">{selectedProduct.category}</Badge>
                            <Badge variant="outline" className="border-[#CD8D9D] text-[#CD8D9D]">
                              {selectedProduct.condition}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-3xl font-bold ${selectedProduct.type === "나눔" ? "text-green-600" : selectedProduct.type === "삽니다" ? "text-blue-600" : "text-[#783445]"}`}
                          >
                            {selectedProduct.price}
                          </span>
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{selectedProduct.likes}명이 관심있어요</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Tag className="w-4 h-4 text-[#CD8D9D]" />
                            <span className="text-sm text-gray-600">브랜드:</span>
                            <span className="font-medium">{selectedProduct.brand}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-[#CD8D9D]" />
                            <span className="text-sm text-gray-600">구매일:</span>
                            <span className="font-medium">{selectedProduct.purchaseDate}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-[#CD8D9D]" />
                            <span className="text-sm text-gray-600">거래 위치:</span>
                            <span className="font-medium">기숙사 {selectedProduct.floor}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="bg-[#F9EEDA] border-b border-[#CD8D9D]">
                      <CardTitle className="text-[#783445] flex items-center gap-2">
                        <User className="w-5 h-5" />
                        판매자 정보
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-[#783445] text-white">
                            {selectedProduct.seller[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-[#783445]">{selectedProduct.seller}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-[#92CEEE] text-[#92CEEE]" />
                            <span className="text-sm text-gray-600">4.8 (거래 12회)</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-[#783445] text-white hover:bg-[#CD8D9D]"
                          onClick={() => setCurrentView("chat")}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {selectedProduct.type === "삽니다" ? "판매 제안하기" : selectedProduct.type === "대여" ? "대여 문의하기" : selectedProduct.type === "찾아요" ? "정보 제안하기" : "채팅하기"}
                        </Button>
                        {selectedProduct.type !== "대여" && selectedProduct.type !== "나눔" && (
                          <Button
                            variant="outline"
                            className="w-full border-[#783445] text-[#783445] hover:bg-[#F9EEDA]"
                          >
                            {selectedProduct.type === "삽니다" ? "가격 제안하기" : "가격 협상하기"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="bg-[#F9EEDA] border-b border-[#CD8D9D]">
                      <CardTitle className="text-[#783445]">상품 설명</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
              <TopNav />
              <div className="grid grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => {
                      setSelectedProduct(product)
                      setCurrentView("product-detail")
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return renderContent()
}
