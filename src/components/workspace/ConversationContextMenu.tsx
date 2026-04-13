import { useState } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal, Share, Pen, Pin, Archive, Trash2, ArrowRightLeft,
} from "lucide-react";
import { MoveConversationDialog } from "./MoveConversationDialog";

interface ConversationContextMenuProps {
  conversationId: string;
  contextType?: string;
  caseId?: string | null;
  processId?: string | null;
}

export function ConversationContextMenu({
  conversationId,
  contextType = "unassigned",
  caseId = null,
  processId = null,
}: ConversationContextMenuProps) {
  const [moveOpen, setMoveOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="text-xs gap-2">
            <Share className="h-3.5 w-3.5" /> Compartilhar
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs gap-2">
            <Pen className="h-3.5 w-3.5" /> Renomear
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs gap-2">
            <Pin className="h-3.5 w-3.5" /> Fixar
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs gap-2">
            <Archive className="h-3.5 w-3.5" /> Arquivar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs gap-2" onSelect={() => setMoveOpen(true)}>
            <ArrowRightLeft className="h-3.5 w-3.5" /> Mover para caso ou processo
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs gap-2 text-destructive focus:text-destructive">
            <Trash2 className="h-3.5 w-3.5" /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MoveConversationDialog
        open={moveOpen}
        onOpenChange={setMoveOpen}
        conversationId={conversationId}
        currentContextType={contextType}
        currentCaseId={caseId}
        currentProcessId={processId}
      />
    </>
  );
}
