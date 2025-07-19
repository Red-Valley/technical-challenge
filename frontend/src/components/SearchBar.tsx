import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Users, UserCheck, X } from 'lucide-react'
import { useSearch, SearchResult } from '../hooks/useSearch'

export const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const results = useSearch(query)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsOpen(query.length > 0 && results.length > 0)
  }, [query, results])

  const handleResultClick = () => {
    setQuery('')
    setIsOpen(false)
    // Focus back to input after navigation
    setTimeout(() => {
      inputRef.current?.blur()
    }, 100)
  }

  const clearSearch = () => {
    setQuery('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const getResultIcon = (type: 'patient' | 'provider') => {
    return type === 'patient' ? Users : UserCheck
  }

  const getResultColor = (type: 'patient' | 'provider') => {
    return type === 'patient' 
      ? 'text-blue-600 dark:text-blue-400' 
      : 'text-green-600 dark:text-green-400'
  }

  const getResultBgColor = (type: 'patient' | 'provider') => {
    return type === 'patient' 
      ? 'bg-blue-50 dark:bg-blue-900/20' 
      : 'bg-green-50 dark:bg-green-900/20'
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative w-full">
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white dark:focus-within:bg-gray-600 transition-all w-full">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients, providers..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 flex-1"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.map((result) => {
              const Icon = getResultIcon(result.type)
              return (
                <Link
                  key={`${result.type}-${result.id}`}
                  to={result.href}
                  onClick={handleResultClick}
                  className={`flex items-center space-x-3 p-3 rounded-lg hover:${getResultBgColor(result.type)} transition-colors group`}
                >
                  <div className={`p-2 rounded-lg ${getResultBgColor(result.type)}`}>
                    <Icon className={`h-4 w-4 ${getResultColor(result.type)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {result.name}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      {result.type === 'patient' ? (
                        <>
                          {result.email && <span>{result.email}</span>}
                          {result.phone && <span>{result.phone}</span>}
                        </>
                      ) : (
                        <span>{result.specialty}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                    {result.type}
                  </div>
                </Link>
              )
            })}
          </div>
          
          {results.length === 0 && query.length > 0 && (
            <div className="p-4 text-center">
              <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No results found</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Try searching for a different term</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 