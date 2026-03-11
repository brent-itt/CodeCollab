<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyEmailMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $code;

    public function __construct(public User $user)
    {
        $this->code = $user->email_verification_code ?? '';
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Your CodeCollab Verification Code');
    }

    public function content(): Content
    {
        return new Content(view: 'emails.verify-email');
    }
}
