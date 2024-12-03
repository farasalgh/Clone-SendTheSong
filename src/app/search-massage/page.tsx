'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { CarouselCard } from "@/components/carousel-card"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from 'lucide-react'
import debounce from 'lodash/debounce'

interface Menfess {
  id: number;
  sender: string;
  recipient: string;
  message: string;
  spotify_id?: string;
  track?: {
    title: string;
    artist: string;
    cover_img: string;
    preview_link: string | null;
    spotify_embed_link: string;
  };
  song?: {
    title: string;
    artist: string;
    coverUrl: string;
  };
  created_at: string;
  updated_at?: string | null;
}

export default function SearchMessagesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Menfess[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchBy, setSearchBy] = useState<'recipient' | 'sender'>('recipient')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchMessages = useCallback(
    debounce(() => {
      fetchMessages()
    }, 1000),
    [searchTerm, searchBy, date, sortOrder]
  )

  useEffect(() => {
    debouncedFetchMessages()
    return () => {
      debouncedFetchMessages.cancel()
    }
  }, [searchTerm, searchBy, date, sortOrder, debouncedFetchMessages])

  const fetchMessages = async () => {
    setIsLoading(true)

    const params = new URLSearchParams()
    if (searchTerm) params.append(searchBy, searchTerm)
    if (date) params.append('date', format(date, 'yyyy-MM-dd'))
    params.append('sort', sortOrder === 'newest' ? 'desc' : 'asc')

    try {
      const response = await fetch(`https://solifess.vercel.app/v1/api/menfess-spotify-search?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error fetching messages')
      }

      const result = await response.json()
      const data: Menfess[] = result.data

      const sortedMessages = data.map(menfess => ({
        ...menfess,
        song: menfess.track ? {
          title: menfess.track.title,
          artist: menfess.track.artist,
          coverUrl: menfess.track.cover_img
        } : undefined
      }));

      setSearchResults(sortedMessages)
    } catch (error) {
      console.error('Error searching messages:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 md:py-16 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Cari Menfess</h1>
        <div className="flex justify-center mb-4 sm:mb-6">
          <Link
            href="https://www.instagram.com/stories/thepdfway/3511672612546304368?utm_source=ig_story_item_share&igsh=dHZ6MWtpdDV5MTVw"
            className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-full hover:border-gray-400"
          >
            <span>saran/masukan/fitur baru</span>
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Input
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12"
                placeholder={`Search by ${searchBy}`}
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
                <Switch
                  id="search-by"
                  checked={searchBy === 'sender'}
                  onCheckedChange={(checked) => setSearchBy(checked ? 'sender' : 'recipient')}
                  aria-label={`Switch search to ${searchBy === 'sender' ? 'recipient' : 'sender'}`}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex w-full sm:w-auto space-x-2">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "flex-grow sm:flex-grow-0 sm:w-[140px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        <span className="truncate">
                          {format(date, "dd MMM yyyy")}
                        </span>
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        setIsCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={() => setDate(undefined)}
                  variant="outline"
                  className="flex-shrink-0"
                >
                  Reset
                </Button>
              </div>
              <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="oldest">Terlama</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : searchResults !== null && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {searchResults.length > 0 ? (
              searchResults.map((msg) => (
                <Link href={`/message/${msg.id}`} key={msg.id} className="w-full max-w-xs flex justify-center">
                  <CarouselCard 
                    to={msg.recipient} 
                    from={msg.sender} 
                    message={msg.message} 
                    songTitle={msg.song?.title}
                    artist={msg.song?.artist}
                    coverUrl={msg.song?.coverUrl}
                  />
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Yahh menfess yang kamu cari gaada :(
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}