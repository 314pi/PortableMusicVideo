;nyquist plug-in
;version 4
;type process
;name "Crossfade Tracks..."
;manpage "Crossfade_Tracks"
;debugbutton disabled
;action "Crossfading..."
;preview selection
;author "Steve Daulton"
;copyright "Released under terms of the GNU General Public License version 2"

;; crossfadetracks.ny by Steve Daulton Nov 2014 / Sep 2015
;; Released under terms of the GNU General Public License version 2:
;; http://www.gnu.org/licenses/old-licenses/gpl-2.0.html .

;control type "Fade type" choice "Constant Gain,Constant Power 1,Constant Power 2,Custom Curve" 0
;control curve "Custom curve" real "" 0 0 1
;control direction "Fade direction" choice "Automatic,Alternating Out / In,Alternating In / Out" 0


(defun crossfade (type dir curve)
  (setf fade-out
    (case dir
      (0 (equal (guessdirection) 'OUT))   ; auto
      (1 (oddp (get '*track* 'index)))    ; fade out odd
      (T (evenp (get '*track* 'index))))) ; fade out even
  (mult *track*
    (cond
      (fade-out
        (case type
          (0 (pwlv 1 1 0))
          (1 (osc (hz-to-step (/ (get-duration 4))) 1 *sine-table* 90))
          (2 (s-sqrt (pwlv 1 1 0)))
          (T (custom curve 0))))
      (T  ; else fade in.
        ; Control envelope sample rate must match sound so that lengths
        ; match exactly, otherwise we get a click at the end of the fade.
        (setf *control-srate* *sound-srate*)
        (case type
          (0 (pwlv 0 1 1))
          (1 (osc (hz-to-step (/ (get-duration 4))) 1))
          (2 (s-sqrt (pwlv 0 1 1)))
          (T (custom curve 1)))))))

(defun custom (curve inout)
  ;; 'epsilon' defines the curvature of a logarithmc curve.
  ;; To avoid log 0 or /0 it must be > 0 and < 1.
  (let* ((curve (+ 0.99 (* -0.98 (min 1 (max 0 curve)))))
         ; magic number 2.7 gives approx 'constant power' curve at 50% setting.
         (epsilon (power curve 2.7)))
    (if (= inout 0)
        (setf logcurve (pwev epsilon 1 1))
        (setf logcurve (pwev 1 1 epsilon)))
    ; Scale and invert curve for 0 to unity gain.
    (sum 1
         (mult (/ -1 (- 1 epsilon))
               (diff logcurve epsilon)))))
 
(defun guessdirection ()
"If the selection is closer to the start of the
audio clip, fade in, otherwise fade out."
  (let* ((start (get '*selection* 'start))
         (end (get '*selection* 'end))
         (clips (get '*track* 'clips))
         (in-dist end)
         (out-dist end))
    (if (arrayp clips)
        (setf clips (append (aref clips 0)(aref clips 1))))
    (dotimes (i (length clips))
      (setf in-dist (min in-dist (abs (- start (first (nth i clips))))))
      (setf out-dist (min out-dist (abs (- end (second (nth i clips)))))))
    (if (< in-dist out-dist) 'in 'out)))

(if (< (length (get '*selection* 'tracks)) 2)
    "Error.\nSelect 2 (or more) tracks to crossfade."
    (crossfade type direction curve))
