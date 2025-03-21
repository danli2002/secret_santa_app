import random
from email.message import EmailMessage
import os
import smtplib
from typing import List

FILENAME = "participants.txt"

# note: some email servers will likely block your message if the name on
# the email is not the same as the one associated in their database?
NAME_ON_EMAIL = "Daniel"

SMTP_ADDRESS = "smtp.my.example.mailserver.net"
SMTP_PORT = 555


class Participant:
    """
    Dataclass for encoding a secret santa participant
    """

    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.giftTo = None

    def __str__(self):
        """
        Pretty print purposes
        """
        return f"{self.name} - {self.email}"


def get_participants_as_list(participant_json: dict) -> List[Participant]:
    """
    Parses input file and creates a Python list of participants
    """
    participants = []
    for name, email in participant_json.items():
        participants.append(Participant(name, email))
    return participants


def assign_gifts(participants):
    """
    idea is that we randomize the list and then match it with itself, but its shifted

    guarantees unique gifter/recipient

    Example:

    A B C D
    D A B C

    maintaining of ordering also guarantees no two people will be
    gifting to one another (unless its literally two people)
    """
    participants_copy = list(participants)
    random.shuffle(participants_copy)
    pc_ref = participants_copy.copy()
    end = participants_copy.pop(-1)
    participants_copy.insert(0, end)

    for i, participant in enumerate(pc_ref):
        participant.giftTo = participants_copy[i]


def send_emails(participants):
    """
    Uses SMTP to send the emails based on determined recipients
    """
    for p in participants:
        s = smtplib.SMTP(SMTP_ADDRESS, SMTP_PORT)
        s.starttls()
        s.login(os.environ.get("GMAIL_ADDRESS"), os.environ.get("GMAIL_PASS"))

        email_text_content = f"""
        Hello {p.name}!\n
        Welcome to Secret Santa! You will be buying for:

        {p.giftTo.name} ({p.giftTo.email})

        Happy holidays!
        """

        msg = EmailMessage()
        msg["Subject"] = "Secret Santa Reveal!"
        msg["From"] = NAME_ON_EMAIL
        msg["To"] = p.email
        msg.set_content(email_text_content)
        s.send_message(msg)
        print(f"Sent email to {p.email}")

        s.quit()


if __name__ == "__main__":
    participants = get_participants_as_list(FILENAME)
    assign_gifts(participants)
    # for p in participants:
    #     print(f'{p.name} will be gifting to {p.giftTo.name}')
    send_emails(participants)
