import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV = ['Главная', 'Генератор', 'Галерея', 'Подписка', 'API', 'Помощь'];

const MODELS = [
  { name: 'Veo 3.1', type: 'Видео', icon: 'Clapperboard', bg: 'bg-neon-violet/15', fg: 'text-neon-violet', desc: 'Кинематографичное видео с озвучкой' },
  { name: 'Kling 3.0', type: 'Видео', icon: 'Film', bg: 'bg-neon-cyan/15', fg: 'text-neon-cyan', desc: 'Реалистичная физика движения' },
  { name: 'Grok Video', type: 'Видео', icon: 'Video', bg: 'bg-neon-pink/15', fg: 'text-neon-pink', desc: 'Быстрая генерация роликов' },
  { name: 'Seedance 2.0', type: 'Видео', icon: 'Sparkles', bg: 'bg-neon-violet/15', fg: 'text-neon-violet', desc: 'Танцы и анимация персонажей' },
  { name: 'Nano Banana 2.0', type: 'Фото', icon: 'Image', bg: 'bg-neon-cyan/15', fg: 'text-neon-cyan', desc: 'Молниеносная генерация картинок' },
  { name: 'Seedream 5.0', type: 'Фото', icon: 'Palette', bg: 'bg-neon-pink/15', fg: 'text-neon-pink', desc: 'Художественные иллюстрации' },
  { name: 'GPT Image 2', type: 'Фото', icon: 'Aperture', bg: 'bg-neon-violet/15', fg: 'text-neon-violet', desc: 'Точное следование промпту' },
  { name: 'WAN 2.7', type: 'Фото', icon: 'ImagePlus', bg: 'bg-neon-cyan/15', fg: 'text-neon-cyan', desc: 'Фотореализм нового уровня' },
  { name: 'Suno', type: 'Аудио', icon: 'Music', bg: 'bg-neon-pink/15', fg: 'text-neon-pink', desc: 'Музыка и вокал по тексту' },
];

const TABS = ['Видео', 'Фото', 'Аудио'] as const;

const SYNTAX: Record<string, { hint: string; chips: string[] }> = {
  'Видео': { hint: 'Kling / Veo синтаксис: [сцена], [движение камеры], [стиль], --duration 5s', chips: ['cinematic shot', 'slow zoom in', 'golden hour', '4k hyperreal', '--duration 10s'] },
  'Фото': { hint: 'GPT-Image синтаксис: subject, lighting, lens, style, --ar 16:9', chips: ['ultra detailed', 'soft studio light', '85mm lens', 'neon palette', '--ar 1:1'] },
  'Аудио': { hint: 'Suno синтаксис: [жанр], [настроение], [инструменты], [vocal: male/female]', chips: ['synthwave', 'epic build-up', '[verse]', '[chorus]', 'female vocal'] },
};

const PLANS = [
  { name: 'Старт', price: '0₽', period: 'навсегда', features: ['30 генераций/мес', 'Фото 720p', 'Помощник промптов'], accent: false },
  { name: 'Pro', price: '990₽', period: 'в месяц', features: ['Безлимит фото', 'Видео 4K', 'Все нейросети', 'Без водяных знаков'], accent: true },
  { name: 'Studio', price: '3 490₽', period: 'в месяц', features: ['Всё из Pro', 'API доступ', 'Приоритет очереди', 'Команда до 5 чел.'], accent: false },
];

const HERO_IMG = 'https://cdn.poehali.dev/projects/9cc8405e-1d47-4203-b837-77e41c00918e/files/b4e2c46a-084c-42c1-a2c9-f94d47674480.jpg';
const PORTRAIT_IMG = 'https://cdn.poehali.dev/projects/9cc8405e-1d47-4203-b837-77e41c00918e/files/8dca3f44-61be-4111-bbe9-f94d47674480.jpg';

const Index = () => {
  const [tab, setTab] = useState<typeof TABS[number]>('Видео');
  const [prompt, setPrompt] = useState('');

  const addChip = (c: string) => setPrompt((p) => (p ? `${p}, ${c}` : c));

  return (
    <div className="min-h-screen bg-mesh text-foreground overflow-x-hidden">
      <div className="fixed inset-0 grid-overlay pointer-events-none opacity-60" />

      {/* NAV */}
      <header className="sticky top-0 z-50">
        <nav className="glass mx-3 mt-3 rounded-2xl px-5 py-3 flex items-center justify-between max-w-7xl xl:mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-violet via-neon-pink to-neon-cyan flex items-center justify-center glow-violet">
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <span className="font-sora font-extrabold text-lg tracking-tight">NEURA<span className="text-gradient">FORGE</span></span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n} href="#" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-colors">{n}</a>
            ))}
          </div>
          <Button className="bg-gradient-to-r from-neon-violet to-neon-pink hover:opacity-90 text-white rounded-xl font-medium border-0">
            Войти
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-5 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-glow-pulse" />
              <span className="text-xs text-muted-foreground font-mono">9 нейросетей в одном окне</span>
            </div>
            <h1 className="font-sora font-extrabold text-5xl md:text-6xl leading-[1.05] tracking-tight mb-6">
              Создавай <span className="text-gradient">видео, фото и музыку</span> силой ИИ
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Veo 3.1, Kling 3.0, Suno и другие топовые модели. Умный помощник подскажет идеальный промпт под каждую нейросеть.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-gradient-to-r from-neon-violet to-neon-pink hover:opacity-90 text-white rounded-xl text-base h-12 px-7 border-0 glow-violet">
                <Icon name="Wand2" size={18} className="mr-2" /> Начать бесплатно
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl text-base h-12 px-7 glass border-white/10 hover:bg-white/5">
                <Icon name="Play" size={18} className="mr-2" /> Смотреть демо
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Icon name="Check" size={16} className="text-neon-cyan" /> Без карты</span>
              <span className="flex items-center gap-2"><Icon name="Check" size={16} className="text-neon-cyan" /> 30 генераций в подарок</span>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden glass p-2 hover-lift">
              <img src={HERO_IMG} alt="AI генерация" className="w-full h-[420px] object-cover rounded-2xl" />
              <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center shrink-0">
                  <Icon name="Sparkles" size={18} className="text-white" />
                </div>
                <p className="text-sm font-mono text-foreground/90 truncate">cinematic neon city, slow zoom --duration 10s</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-4 glass rounded-2xl px-4 py-3 animate-float flex items-center gap-2">
              <Icon name="Music" size={18} className="text-neon-pink" />
              <span className="text-sm font-medium">Suno • готово</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="font-sora font-bold text-3xl md:text-4xl mb-3">Все топовые модели <span className="text-gradient">2026 года</span></h2>
          <p className="text-muted-foreground">Переключайся между нейросетями без подписок на каждую</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODELS.map((m, i) => (
            <div key={m.name} className="glass rounded-2xl p-6 hover-lift group cursor-pointer" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${m.bg}`}>
                  <Icon name={m.icon} size={24} className={m.fg} />
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full glass text-muted-foreground">{m.type}</span>
              </div>
              <h3 className="font-sora font-semibold text-lg mb-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GENERATOR */}
      <section className="max-w-5xl mx-auto px-5 py-16">
        <div className="glass rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-2 mb-6">
            <Icon name="Terminal" size={20} className="text-neon-cyan" />
            <h2 className="font-sora font-bold text-2xl">Помощник промптов</h2>
          </div>

          <div className="flex gap-2 mb-5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setPrompt(''); }}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === t ? 'bg-gradient-to-r from-neon-violet to-neon-pink text-white glow-violet' : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <p className="text-xs font-mono text-muted-foreground mb-3 flex items-center gap-2">
            <Icon name="Info" size={14} className="text-neon-cyan" /> {SYNTAX[tab].hint}
          </p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опиши, что хочешь сгенерировать..."
            className="w-full h-32 rounded-2xl bg-input/60 border border-border focus:border-neon-violet focus:outline-none focus:ring-2 focus:ring-neon-violet/30 p-4 font-mono text-sm resize-none transition-all"
          />

          <div className="flex flex-wrap gap-2 my-4">
            {SYNTAX[tab].chips.map((c) => (
              <button key={c} onClick={() => addChip(c)} className="text-xs font-mono px-3 py-1.5 rounded-lg glass hover:border-neon-cyan/40 hover:text-neon-cyan transition-colors">
                + {c}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground font-mono">{prompt.length} символов</span>
            <Button className="bg-gradient-to-r from-neon-violet via-neon-pink to-neon-cyan bg-[length:200%_auto] hover:bg-right text-white rounded-xl h-11 px-7 border-0 transition-all duration-500">
              <Icon name="Sparkles" size={18} className="mr-2" /> Сгенерировать
            </Button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-sora font-bold text-3xl md:text-4xl">Галерея <span className="text-gradient">сообщества</span></h2>
          <a href="#" className="text-sm text-neon-cyan hover:underline flex items-center gap-1">Все работы <Icon name="ArrowRight" size={16} /></a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[HERO_IMG, PORTRAIT_IMG, HERO_IMG, PORTRAIT_IMG].map((src, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden glass p-1.5 hover-lift group">
              <img src={src} alt={`Работа ${i + 1}`} className="w-full h-56 object-cover rounded-xl" />
              <div className="absolute inset-1.5 rounded-xl bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-mono text-white/90">{i % 2 === 0 ? 'Veo 3.1' : 'Seedream 5.0'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="font-sora font-bold text-3xl md:text-4xl mb-3">Простые <span className="text-gradient">тарифы</span></h2>
          <p className="text-muted-foreground">Начни бесплатно, переходи на Pro когда нужно больше</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative rounded-3xl p-8 hover-lift ${p.accent ? 'glass border-neon-violet/40 glow-violet' : 'glass'}`}>
              {p.accent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-neon-violet to-neon-pink text-white">Популярный</span>
              )}
              <h3 className="font-sora font-semibold text-xl mb-2">{p.name}</h3>
              <div className="mb-6">
                <span className="font-sora font-extrabold text-4xl">{p.price}</span>
                <span className="text-muted-foreground text-sm"> / {p.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Icon name="Check" size={16} className="text-neon-cyan shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full rounded-xl h-11 border-0 ${p.accent ? 'bg-gradient-to-r from-neon-violet to-neon-pink text-white' : 'glass hover:bg-white/5 text-foreground'}`}>
                Выбрать
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="relative glass rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-violet/10 via-transparent to-neon-cyan/10" />
          <div className="relative">
            <h2 className="font-sora font-extrabold text-3xl md:text-5xl mb-4">Готов создавать <span className="text-gradient">шедевры</span>?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">Присоединяйся к тысячам креаторов. Первые 30 генераций — бесплатно.</p>
            <Button size="lg" className="bg-gradient-to-r from-neon-violet to-neon-pink hover:opacity-90 text-white rounded-xl text-base h-13 px-8 py-4 border-0 glow-violet">
              <Icon name="Rocket" size={18} className="mr-2" /> Запустить генератор
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 mt-8">
        <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center">
              <Icon name="Zap" size={15} className="text-white" />
            </div>
            <span className="font-sora font-bold">NEURAFORGE</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 NeuraForge. Создано с ❤️ для креаторов.</p>
          <div className="flex gap-3">
            {['Send', 'Github', 'Twitter'].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:text-neon-cyan transition-colors">
                <Icon name={s} size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;