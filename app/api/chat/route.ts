import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the portfolio assistant for Usama Riaz, a Full Stack Developer and AI Automation Expert based in Pakistan. Help visitors learn about Usama's services: web development ($300+), booking automation ($400+), AI automation ($500+). His projects include Hirevate.com (AI resume builder), EditingApp.live, AionAI.live, and various GHL automation systems. If someone wants to hire him, guide them to scroll down to the booking section or email contact@usama.services. Be concise, confident, and professional.`;

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                {
                    content:
                        "The AI assistant is not configured yet. Please reach out to contact@usama.services directly!",
                },
                { status: 200 }
            );
        }

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 500,
                system: SYSTEM_PROMPT,
                messages: messages.slice(-10).map(
                    (m: { role: string; content: string }) => ({
                        role: m.role,
                        content: m.content,
                    })
                ),
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Anthropic API error:", error);
            return NextResponse.json(
                {
                    content:
                        "I'm having trouble connecting right now. Please email contact@usama.services instead!",
                },
                { status: 200 }
            );
        }

        const data = await response.json();
        const content =
            data.content?.[0]?.text ||
            "Sorry, I couldn't process that. Try again or email contact@usama.services.";

        return NextResponse.json({ content });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            {
                content:
                    "Something went wrong. Please reach out to contact@usama.services directly!",
            },
            { status: 500 }
        );
    }
}
