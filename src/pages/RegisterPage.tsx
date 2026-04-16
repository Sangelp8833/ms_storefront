import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'
import { useAuthStore } from '@/store/authStore'
import api from '@/lib/api'

interface FieldErrors {
  name?: string
  email?: string
  password?: string
  address?: string
  general?: string
}

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e: FieldErrors = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (!form.email.includes('@')) e.email = 'Ingresa un email válido'
    if (form.password.length < 8) e.password = 'Mínimo 8 caracteres'
    if (!form.address.trim()) e.address = 'La dirección es requerida'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setErrors({})
    try {
      const { data } = await api.post('/auth/register', form)
      setAuth(data.token, data.user.id, data.user.email, data.user.name)
      navigate('/tienda', { replace: true })
    } catch (err: unknown) {
      const resp = (err as { response?: { data?: { errors?: Record<string, string[]>; error?: string } } }).response
      if (resp?.data?.errors) {
        const serverErrors: FieldErrors = {}
        for (const [k, v] of Object.entries(resp.data.errors)) {
          (serverErrors as Record<string, string>)[k] = v[0]
        }
        setErrors(serverErrors)
      } else {
        setErrors({ general: resp?.data?.error ?? 'Ocurrió un error. Intenta de nuevo.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">

        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <BookOpen size={32} className="text-accent" />
          <h1 className="font-sans text-2xl font-bold text-text-primary">Crea tu cuenta</h1>
          <p className="font-body text-sm text-text-secondary">Únete a los amantes de los libros</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          {errors.general && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm font-body text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input label="Nombre completo" placeholder="María García" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
            <Input label="Email" type="email" placeholder="tu@correo.com" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
            <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={set('password')} error={errors.password} autoComplete="new-password" />
            <Input label="Dirección de entrega" placeholder="Calle 123 #45-67, Bogotá" value={form.address} onChange={set('address')} error={errors.address} autoComplete="street-address" />
            <Button type="submit" loading={loading} className="w-full mt-1">
              Crear cuenta
            </Button>
          </form>

          <p className="mt-6 text-center text-sm font-body text-text-secondary">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-accent font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
