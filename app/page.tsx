"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function MonthsaryInvite() {
  const [rsvp, setRsvp] = useState<"yes" | "no" | null>(null);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.3384707934806!2d121.0195!3d14.56194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9f1e0e0e0e1%3A0x7a7a7a7a7a7a7a7a!2sManam%20Comfort%20Filipino%20-%20Salcedo!5e0!3m2!1sen!2sph!4v1699999999999!5m2!1sen!2sph";

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  async function handleSendRSVP() {
    try {
      const url = "https://discord.com/api/webhooks/1437987432711847978/-J1hQxZLlXQTgsCjlXmlui94SQsSrWPDf1YpCt9COEl7bwdN_MHzImKLgrTFghB_vB7y";
      const embed = {
        title: "Monthsary RSVP Received",
        color: rsvp === "yes" ? 0x10b981 : 0xef4444,
        fields: [
          { name: "Response", value: rsvp === "yes" ? "YES, I will be there!" : "Cannot make it.", inline: false },
          { name: "Note", value: note || "No note provided", inline: false }
        ],
        timestamp: new Date().toISOString()
      };
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] })
      });
      if (response.ok) {
        setSent(true);
        setShowConfetti(true);
      } else {
        alert("Failed to send RSVP");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send RSVP");
    }
  }

  function reset() {
    setRsvp(null);
    setNote("");
    setSent(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-3 sm:p-6 relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#ec4899', '#f472b6', '#fbbf24', '#34d399', '#60a5fa'][Math.floor(Math.random() * 5)],
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti forwards;
        }
      `}</style>

      <div className="max-w-3xl w-full bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden animate-fade-in">
        <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden group">
          <Image
            alt="Us together"
            src="/couple-photo.jpg"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
            <div className="p-5 sm:p-8 md:p-10 text-white w-full">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-2 sm:mb-3 drop-shadow-lg">
                Monthsary Sundate in Salcedo
              </h1>
              <p className="text-sm sm:text-base md:text-xl font-medium opacity-95 drop-shadow-md">
                12:00 PM – 4:00 PM • Manam • Salcedo Village
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:gap-6">
            <div className="md:flex-1">
              <h2 className="text-xl sm:text-lg font-semibold">Plan (quick glance)</h2>
              <ul className="mt-3 space-y-2.5 sm:space-y-2 text-base sm:text-sm text-gray-700">
                <li>• <strong>12:00–1:15 PM</strong> — Lunch at <em>Manam</em>. </li>
                <li>• <strong>1:15–1:30 PM</strong> — Walk to Jaime C. Velasquez (Salcedo) Park.</li>
                <li>• <strong>1:30–2:15 PM</strong> — Chill at the park</li>
                <li>• <strong>2:15–3:00 PM</strong> — Dessert / coffee nearby.</li>
                <li>• <strong>3:00–3:40 PM</strong> — Stroll at Washington SyCip Park.</li>
                <li>• <strong>3:40–4:00 PM</strong> — Wubwub na siguro.</li>
              </ul>

              <div className="mt-6">
                <h3 className="text-base sm:text-sm font-medium">Little touches</h3>
                <div className="mt-2 text-base sm:text-sm text-gray-600">
                  I have a surprise for you pls sana matuloy ❤️
                </div>
              </div>

              <div className="mt-6 bg-gray-50 p-4 md:p-6 rounded-lg animate-fade-in-up">
                <h3 className="text-base md:text-sm font-semibold">Will you come?</h3>
                <p className="text-sm md:text-xs text-gray-600 mt-1">Tap to RSVP — this is just between us.</p>

                <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    onClick={() => setRsvp("yes")}
                    variant={rsvp === "yes" ? "default" : "outline"}
                    className={`transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm ${rsvp === "yes" ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                  >
                    Yes, I&apos;ll be there hehe
                  </Button>

                  <Button
                    onClick={() => setRsvp("no")}
                    variant={rsvp === "no" ? "secondary" : "outline"}
                    className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm"
                  >
                    I can&apos;t make it di na kasi kita lab
                  </Button>
                </div>

                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Short note (optional)"
                  className="mt-4 transition-all duration-200 focus:scale-[1.02] min-h-24 text-base"
                />

                <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    onClick={handleSendRSVP}
                    disabled={!rsvp}
                    className="bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 disabled:hover:scale-100 disabled:hover:translate-y-0 w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm font-semibold"
                  >
                    Send RSVP
                  </Button>

                  <Button 
                    onClick={reset} 
                    variant="outline"
                    className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm"
                  >
                    Reset
                  </Button>
                </div>

                {sent && (
                  <div className="mt-3 text-sm text-green-700 font-medium animate-bounce-in flex items-center gap-2">
                    <span className="text-lg">🎉</span> RSVP sent successfully!
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="p-4 sm:p-5 rounded-lg border">
                <h4 className="text-base sm:text-sm font-semibold">Location</h4>
                <p className="text-sm sm:text-xs text-gray-600 mt-1">Manam (Salcedo area) — Jaime C. Velasquez Park nearby.</p>

                <div className="mt-3 h-48 md:h-40 rounded overflow-hidden border">
                  <iframe
                    title="map"
                    src={mapSrc}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4">
                  <h5 className="text-sm md:text-xs font-medium">Share</h5>
                  <div className="mt-2 flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigator.clipboard?.writeText(window.location.href)}
                      className="transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto h-11 sm:h-9 text-base sm:text-sm"
                    >
                      Copy link
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      asChild
                      className="transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto h-11 sm:h-9 text-base sm:text-sm"
                    >
                      <a href={`https://wa.me?text=${encodeURIComponent("Can we spend Sunday together? I made a little plan: Manam + Salcedo. ❤️")}`}>
                        Message
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500">Made with ❤️</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
