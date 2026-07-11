import React, { useRef, useState } from 'react'
import { Heart, MessageCircle, Play } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'

interface Reel {
  id: number
  videoUrl: string
  caption: string
  likes: string
  comments: string
  postUrl: string
}

const REELS_DATA: Reel[] = [
  {
    id: 1,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-racks-of-clothes-in-a-fashion-store-41553-large.mp4",
    caption: "Walkthrough of our new Autumn/Winter showroom collection. 🍂✨ #bedigarments #heritage",
    likes: "1.2K",
    comments: "48",
    postUrl: "https://www.instagram.com/bedigarments1984/"
  },
  {
    id: 2,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-choosing-clothes-in-a-boutique-41551-large.mp4",
    caption: "Personal styling & tailored fittings in progress. Find your perfect fit. 🧵💼 #luxury #couture",
    likes: "945",
    comments: "32",
    postUrl: "https://www.instagram.com/bedigarments1984/"
  },
  {
    id: 3,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-in-casual-clothes-posing-41753-large.mp4",
    caption: "Premium cotton basics & minimal casual wear styling. 👕☀️ #menswear #summeressentials",
    likes: "1.8K",
    comments: "76",
    postUrl: "https://www.instagram.com/bedigarments1984/"
  },
  {
    id: 4,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-hat-posing-4552-large.mp4",
    caption: "Heritage festive wear and school uniform collections. 🪔🏫 #traditional #fashiondiary",
    likes: "2.1K",
    comments: "112",
    postUrl: "https://www.instagram.com/bedigarments1984/"
  }
]

export const InstagramReels: React.FC = () => {
  return (
    <section 
      className="w-full bg-white py-20 md:py-24 border-b border-border-primary/50 overflow-hidden select-none"
      aria-label="Instagram Reels Section"
    >
      <div className="max-w-[1550px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-primary/50 pb-8 mb-12">
          <div>
            <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
              Social Journal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text uppercase mt-2">
              BEDI GARMENTS ON REELS
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <a
              href="https://www.instagram.com/bedigarments1984/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-3 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded-sm hover:bg-brand-accent transition-colors duration-300 focus:outline-none shadow-sm"
            >
              <FaInstagram size={14} />
              <span>FOLLOW @bedigarments1984</span>
            </a>
          </div>
        </div>

        {/* Swipeable Reels Grid */}
        <div className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory px-2 py-4 -mx-2 -webkit-overflow-scrolling-touch">
          {REELS_DATA.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
          {/* Spacing alignment helper */}
          <div className="w-1 flex-shrink-0 after:flex-shrink-0" />
        </div>

      </div>
    </section>
  )
}

/* Individual Reel Card Component handling hover Autoplay state */
const ReelCard: React.FC<{ reel: Reel }> = ({ reel }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.log("Autoplay was prevented:", err)
      })
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  return (
    <a
      href={reel.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 w-[280px] sm:w-[320px] aspect-[9/16] rounded-[24px] overflow-hidden bg-black shadow-[0_10px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] group cursor-pointer snap-start border border-border-primary/20"
    >
      {/* Video Loop Element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Static Play button overlay before hover */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all duration-300">
          <div className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 transform group-hover:scale-110 transition-transform duration-300">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      )}

      {/* Bottom Text and Actions Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 flex flex-col justify-end text-white select-none">
        
        {/* Caption text */}
        <p className="text-[11px] leading-relaxed font-body font-medium text-slate-200 line-clamp-2 mb-4 group-hover:line-clamp-none transition-all duration-300">
          {reel.caption}
        </p>

        {/* Action icons bar */}
        <div className="flex items-center justify-between border-t border-white/20 pt-3">
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center space-x-1">
              <Heart size={12} className="text-red-500 fill-current" />
              <span>{reel.likes}</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-300">
              <MessageCircle size={12} />
              <span>{reel.comments}</span>
            </span>
          </div>

          <div className="text-white/70 group-hover:text-white transition-colors">
            <FaInstagram size={14} />
          </div>
        </div>

      </div>
    </a>
  )
}

export default InstagramReels
