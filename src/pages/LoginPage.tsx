import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'
import { useAuthStore } from '@/store/authStore'
import api from '@/lib/api'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)

  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const validate = () => {
    const e: typeof errors = {}
    if (!email.includes('@')) e.email = 'Ingresa un email válido'
    if (!password) e.password = 'La contraseña es requerida'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setErrors({})
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setAuth(data.token, data.user.id, data.user.email, data.user.name)
      const redirect = params.get('redirect') ?? '/tienda'
      navigate(redirect, { replace: true })
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } }).response?.status
      if (status === 401) {
        setErrors({ general: 'Email o contraseña incorrectos' })
      } else {
        setErrors({ general: 'Ocurrió un error. Intenta de nuevo.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <BookOpen size={32} className="text-accent" />
          <h1 className="font-sans text-2xl font-bold text-text-primary">Bienvenida de vuelta</h1>
          <p className="font-body text-sm text-text-secondary">Inicia sesión en tu cuenta</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          {errors.general && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm font-body text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <Input
              label="Email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
            />
            <Button type="submit" loading={loading} className="w-full mt-1">
              Iniciar sesión
            </Button>
          </form>

          <p className="mt-6 text-center text-sm font-body text-text-secondary">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-accent font-medium hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
