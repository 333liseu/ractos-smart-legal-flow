import {
  LayoutDashboard,
  Briefcase,
  FileText,
  ListTodo,
  Users,
  FolderOpen,
  DollarSign,
  Columns3,
  Bell,
  MessageCircle,
  Sparkles,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Processos", url: "/cases", icon: Briefcase },
  { title: "Movimentações", url: "/movements", icon: FileText },
  { title: "Tarefas", url: "/tasks", icon: ListTodo },
  { title: "Clientes", url: "/clients", icon: Users },
  { title: "Documentos", url: "/documents", icon: FolderOpen },
];

const financeItems = [
  { title: "Financeiro", url: "/financial", icon: DollarSign },
];

const intelligenceItems = [
  { title: "Actus Zap", url: "/actus-zap", icon: MessageCircle },
  { title: "Gerador de Docs", url: "/doc-generator", icon: Sparkles },
  { title: "Workspace", url: "/workspace", icon: Columns3 },
];

const systemItems = [
  { title: "Notificações", url: "/notifications", icon: Bell },
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold">
        {!collapsed && label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className="gap-3 text-sm font-medium text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                  activeClassName="bg-sidebar-accent text-foreground"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">R</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-bold text-foreground tracking-tight">Ractos One</h1>
              <p className="text-[10px] text-muted-foreground">Gestão Jurídica Inteligente</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        {renderGroup("Gestão Processual", mainItems)}
        {renderGroup("Financeiro", financeItems)}
        {renderGroup("Inteligência", intelligenceItems)}
        {renderGroup("Sistema", systemItems)}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-medium text-foreground">DG</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">Dr. Carlos Andrade</p>
              <p className="text-[10px] text-muted-foreground">Administrador</p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
