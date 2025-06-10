
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  text: string;
  timestamp: Date;
  author: string;
}

interface StepCommentsProps {
  stepId: number;
  language: string;
}

const StepComments = ({ stepId, language }: StepCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const texts = {
    de: {
      title: "Kommentare zu diesem Schritt",
      placeholder: "Teilen Sie Ihre Erfahrungen oder Fragen zu diesem Schritt...",
      send: "Senden",
      noComments: "Noch keine Kommentare vorhanden.",
      anonymous: "Anonym"
    },
    en: {
      title: "Comments for this step",
      placeholder: "Share your experience or questions about this step...",
      send: "Send",
      noComments: "No comments yet.",
      anonymous: "Anonymous"
    }
  };

  const t = texts[language as keyof typeof texts] || texts.de;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      timestamp: new Date(),
      author: t.anonymous
    };

    setComments([...comments, comment]);
    setNewComment('');
    toast.success(language === 'de' ? 'Kommentar hinzugefügt!' : 'Comment added!');
  };

  return (
    <div className="mt-4">
      <Button
        variant="outline"
        onClick={() => setIsVisible(!isVisible)}
        className="w-full justify-between"
        aria-expanded={isVisible}
        aria-label={t.title}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          {t.title}
        </div>
        <Badge variant="secondary">{comments.length}</Badge>
      </Button>

      {isVisible && (
        <Card className="mt-2">
          <CardHeader>
            <CardTitle className="text-lg">{t.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t.placeholder}
                className="min-h-20"
                aria-label={t.placeholder}
              />
              <Button type="submit" size="sm" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                {t.send}
              </Button>
            </form>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {comments.length === 0 ? (
                <p className="text-muted-foreground text-sm">{t.noComments}</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border rounded-md p-3 bg-muted/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {comment.timestamp.toLocaleString(language === 'de' ? 'de-DE' : 'en-US')}
                      </span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StepComments;
